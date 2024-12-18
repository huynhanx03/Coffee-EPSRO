import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as geolib from 'geolib'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Linking, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import * as Icons from 'react-native-heroicons/outline'
import { Divider } from 'react-native-paper'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/header'
import ItemPay from '../components/itemPay'
import ItemPayList from '../components/itemPayList'
import ShowToast from '../components/toast'
import { useNotification } from '../context/ModalContext'
import { removeItemCart } from '../controller/CartController'
import { saveOrder } from '../controller/OrderController'
import { updateVoucherUsed } from '../controller/VoucherController'
import getDefaultAddress from '../customHooks/getDefaultAddress'
import { clearCart } from '../redux/slices/cartSlice'
import { removeVoucher } from '../redux/slices/voucherSlice'
import { colors } from '../theme'
import { formatPrice } from '../utils'
import { PAYMENT_TYPE } from '../constants'
import { getStatusTransaction, paymentByMomo } from '../controller/PaymentController'
import ModalLoading from '../components/modalLoading'

const PreparePayScreen = ({ route }) => {
    const navigation = useNavigation()
    const product = route.params
    const dispatch = useDispatch()
    const addressData = getDefaultAddress()
    const [totalProduct, setTotalProduct] = useState(0)
    const [transFee, setTransFee] = useState(10000) // 10,000 VND
    const [total, setTotal] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [coord, setCoord] = useState({ latitude: 0, longtitude: 0 })
    const [timeDelivery, setTimeDelivery] = useState({
        hour: 0,
        minutes: 0,
        seconds: 0,
    })
    const [method, setMethod] = useState(PAYMENT_TYPE.COD)
    const cart = useSelector((state) => state.cart.cart)
    const voucher = useSelector((state) => state.voucher.voucher)
    const [isLoading, setIsLoading] = useState(false)
    const { showNotification } = useNotification()

    useEffect(() => {
        if (addressData) {
            setCoord({
                latitude: addressData.latitude,
                longtitude: addressData.longtitude,
            })
        }
    }, [addressData])

    useEffect(() => {
        if (Object.keys(voucher).length > 0) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }, [voucher])

    const handleTotal = () => {
        let totalProduct = 0
        if (product) {
            totalProduct = product.Gia * product.SoLuong
        } else {
            cart.forEach((item) => {
                totalProduct += item.SoLuong * item.Gia
            })
        }

        if (voucher.PhanTramGiam) {
            setTotal(totalProduct * (1 - voucher.PhanTramGiam / 100) + transFee)
        } else {
            setTotal(totalProduct + transFee)
        }

        setTotalProduct(totalProduct)
    }

    useEffect(() => {
        handleTotal()
    }, [totalProduct, transFee, voucher])

    const handleCalDistance = () => {
        if (coord.latitude == 0 && coord.longtitude == 0) return 0
        const distance = geolib.getPreciseDistance(
            { latitude: 10.8700233, longitude: 106.8025735 },
            { latitude: coord.latitude, longitude: coord.longtitude },
            1
        )

        let time = distance / 40000 // Assume speed is 40km/h
        time = time * 3600 + 10 * 60
        setTimeDelivery({
            hour: Math.floor(time / 3600),
            minutes: Math.floor((time % 3600) / 60),
            seconds: Math.floor(time % 60),
        })

        return distance
    }

    useEffect(() => {
        const distance = handleCalDistance()
        let TransFee = (distance / 1000) * 10000
        setTransFee(TransFee)
    }, [coord])

    const isValidDistance = useMemo(() => {
        if (!addressData) return false
        const isDistance = geolib.isPointWithinRadius(
            { latitude: 10.8700233, longitude: 106.8025735 }, // Default location
            { latitude: addressData.latitude, longitude: addressData.longtitude },
            5000
        )

        return isDistance
    }, [addressData])

    const handleCancelVoucher = () => {
        dispatch(removeVoucher())
        setIsVisible(false)
    }

    const checkStatusTransaction = async (orderId) => {
        const intervalId = setInterval(async () => {
            try {
                const response = await getStatusTransaction(orderId)
                if (response.resultCode === 0) {
                    clearInterval(intervalId)
                    showNotification('Thanh toán thành công', 'success')
                    navigation.navigate('OrderSuccess')
                }
            } catch (error) {
                clearInterval(intervalId)
                showNotification(error.message, 'error')
            }
        }, 1000)
    }

    const checkOutByMomo = async () => {
        try {
            const sum = total + transFee
            const rounded = Math.round(sum)
            const response = await paymentByMomo(rounded)
            if (response.payUrl) {
                console.log(response.payUrl)
                Linking.openURL(response.payUrl).catch((err) => {
                    showNotification('Không thể mở MoMo', 'error')
                })
            }
            return response.orderId
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }

    const prepareProductList = () => {
        if (product) {
            return { productList: [product], isCart: false }
        }
        return { productList: cart, isCart: true }
    }

    const handleMethod = (method) => {
        setMethod(method)
    }

    const handleSaveOrder = async (productList, total, transFee, addressData, status, isCart) => {
        try {
            await saveOrder(productList, total, transFee, addressData, status || 'Chờ xác nhận')
            if (isCart) {
                dispatch(clearCart())
                await removeItemCart()
            }
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }

    const handleCheckOut = async () => {
        try {
            if (!addressData) {
                ShowToast('error', 'Lỗi', 'Vui lòng chọn địa chỉ nhận hàng')
                return
            }
            
            if (!isValidDistance) {
                showNotification('Địa chỉ nhận hàng không hỗ trợ giao hàng', 'error')
                return
            }

            const { productList, isCart } = prepareProductList()

            if (method === PAYMENT_TYPE.MOMO) {
                setIsLoading(true)
                const orderId = await checkOutByMomo()
                if (orderId) {
                    checkStatusTransaction(orderId)
                }
                await handleSaveOrder(productList, total, transFee, addressData, 'Đã thanh toán', isCart)
                setIsLoading(false)
            } else {
                handleSaveOrder(productList, total, transFee, addressData, 'Chờ xác nhận', isCart)
            }
            if (voucher) {
                try {
                    await updateVoucherUsed(voucher.MaPhieuGiamGia)
                    dispatch(removeVoucher())
                } catch (error) {
                    console.log(error)
                }
            }
            method === PAYMENT_TYPE.COD ? navigation.navigate('OrderSuccess') : null
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }

    return (
        <View className="flex-1">
            <Header title="Thanh toán" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                className="pt-2 space-y-3 flex-1">
                <View className="mx-5 space-y-1">
                    <View className="flex-row items-center gap-3">
                        <Icons.MapPinIcon
                            size={24}
                            color={'red'}
                        />
                        <Text className="text-base">Địa chỉ nhận hàng</Text>
                    </View>
                    <Pressable
                        onPress={() => navigation.navigate('Address')}
                        className="ml-9 space-y-1 flex-row justify-between">
                        <View style={{ width: wp(70) }}>
                            <View className="flex-row gap-1 items-center">
                                <Text className="text-base">{addressData?.HoTen}</Text>
                                <Text>|</Text>
                                <Text className="text-base">{addressData?.SoDienThoai}</Text>
                            </View>
                            <View>
                                <Text>{addressData?.DiaChi}</Text>
                            </View>
                        </View>
                        <View>
                            <Icons.ChevronRightIcon
                                size={24}
                                color={'black'}
                            />
                        </View>
                    </Pressable>
                </View>

                <Divider className="p-1 bg-white" />

                <View>{product ? <ItemPay item={product} /> : <ItemPayList />}</View>

                <Divider className="p-1 bg-white" />

                <View className="p-3">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Voucher')}
                        className="flex-row justify-between">
                        <View className="flex-row space-x-1">
                            <Icons.TicketIcon
                                size={24}
                                color={colors.active}
                                strokeWidth={2}
                            />
                            <Text className="text-base font-semibold">Voucher giảm giá</Text>
                        </View>
                        <Icons.ChevronRightIcon
                            size={24}
                            color={'black'}
                        />
                    </TouchableOpacity>
                </View>

                {isVisible && (
                    <View className="mx-3">
                        <View className="p-2 bg-white rounded-md">
                            <Text className="text-base font-semibold">Áp dụng voucher: {voucher.NoiDung}</Text>
                            <View className="flex-row items-end">
                                <Text className="mb-1">Giảm giá: </Text>
                                <Text className="text-lg font-bold text-red-500">{voucher.PhanTramGiam}%</Text>
                            </View>

                            <View className="absolute right-0">
                                <TouchableOpacity
                                    onPress={handleCancelVoucher}
                                    className="items-center justify-center rounded-full"
                                    style={{ width: wp(8), height: wp(8) }}>
                                    <Icons.XMarkIcon
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}

                <Divider className="p-1 bg-white" />

                <View className="">
                    <View className="mx-1 space-y-2 p-2">
                        <View className="flex-row space-x-1">
                            <Icons.TruckIcon
                                size={24}
                                color={colors.active}
                                strokeWidth={2}
                            />
                            <Text
                                style={{ color: colors.text(1) }}
                                className="text-base font-semibold">
                                Thông tin vận chuyển
                            </Text>
                        </View>
                        <Divider />
                        <View className="flex-row items-center justify-between">
                            <View className="space-y-1">
                                <Text className="font-bold text-base">Vận chuyển nhanh</Text>
                                <Text className="font-semibold text-base">Giao hàng nhanh</Text>
                                <Text className="text-gray-500">
                                    Nhận hàng sau {timeDelivery.hour} giờ {timeDelivery.minutes} phút{' '}
                                    {timeDelivery.seconds} giây
                                </Text>
                            </View>
                            <View>
                                <Text className="text-base">{formatPrice(transFee)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Divider className="p-1 bg-white" />

                <View className="">
                    <View className="mx-1 space-y-2 p-2">
                        <View className="flex-row space-x-1">
                            <Icons.CurrencyDollarIcon
                                size={24}
                                color={colors.active}
                                strokeWidth={2}
                            />
                            <Text
                                className="text-base font-semibold"
                                style={{ color: colors.text(1) }}>
                                Phương thức thanh toán
                            </Text>
                        </View>
                        <Divider />
                        <View className="space-y-3">
                            <Pressable onPress={() => handleMethod(PAYMENT_TYPE.COD)}>
                                <View className="flex-row space-x-1 items-center">
                                    <View
                                        className={`border-2 border-gray-500 p-2 ml-[2.5px] rounded-full ${
                                            method === PAYMENT_TYPE.COD ? 'bg-amber-400' : 'bg-white'
                                        }`}
                                    />
                                    <Text className="text-base">Thanh toán khi nhận hàng</Text>
                                </View>
                            </Pressable>
                            <Pressable onPress={() => handleMethod(PAYMENT_TYPE.MOMO)}>
                                <View className="flex-row space-x-1 items-center">
                                    <View
                                        className={`border-2 border-gray-500 p-2 ml-[2.5px] rounded-full ${
                                            method === PAYMENT_TYPE.MOMO ? 'bg-amber-400' : 'bg-white'
                                        }`}
                                    />
                                    <Text className="text-base">Thanh toán bằng MOMO</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <Divider className="p-1 bg-white" />

                <View>
                    <View className="mx-1 space-y-2 p-2">
                        <View className="flex-row space-x-1">
                            <MaterialCommunityIcons
                                name="file-document-multiple-outline"
                                size={24}
                                color={colors.active}
                            />
                            <Text className="text-base font-semibold">Chi tiết thanh toán</Text>
                        </View>
                        <Divider />
                        <View className="">
                            <View className="flex-row justify-between">
                                <Text className="text-base">Tổng tiền hàng: </Text>
                                <Text className="text-base">{formatPrice(totalProduct)}</Text>
                            </View>
                            <View className="flex-row justify-between">
                                <Text className="text-base">Tổng tiền phí vận chuyển: </Text>
                                <Text className="text-base">{formatPrice(transFee)}</Text>
                            </View>
                            {isVisible && (
                                <View className="flex-row justify-between">
                                    <Text className="text-base">Khuyến mãi: </Text>
                                    <Text className="text-base">{voucher.PhanTramGiam}%</Text>
                                </View>
                            )}
                            <View className="flex-row justify-between mt-1">
                                <Text className="text-base font-semibold">Tổng thanh toán: </Text>
                                <Text className="text-base font-semibold">{formatPrice(total)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="p-2"></View>
            </ScrollView>

            <View
                className="bg-white rounded-lg justify-center shadow-md"
                style={{ height: hp(10) }}>
                <View className="mx-5 flex-row justify-between items-center">
                    <View>
                        <Text className="text-sm font-semibold text-gray-700">Tổng thanh toán</Text>
                        <Text
                            className="text-xl font-bold"
                            style={{ color: colors.text(1) }}>
                            {formatPrice(total)}
                        </Text>
                    </View>
                    <View
                        className="rounded-lg"
                        style={{ backgroundColor: colors.primary }}>
                        <TouchableOpacity
                            onPress={handleCheckOut}
                            className="p-3 px-5">
                            <Text className="font-semibold text-xl text-white">Thanh toán</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ModalLoading isLoading={isLoading} />
        </View>
    )
}

export default PreparePayScreen
