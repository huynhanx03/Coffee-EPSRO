import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderDetailList from '../../components/OrderDetail/OrderDetailList'
import { useNotification } from '../../context/NotificationContext/NotificationContext'
import useCancelOrder from '../../hooks/useCancelOrder'
import useGetStatusOrder from '../../hooks/useGetStatusOrder'
import useSetStatusOrder from '../../hooks/useSetStatusOrder'
import useTakeUpOrder from '../../hooks/useTakeUpOrder'
import { colors } from '../../theme/Theme'
import { formatPrice } from '../../utils'

const OrderDetailScreen = ({ route }) => {
    const navigation = useNavigation()
    const { showNotification } = useNotification()
    const { orderId, address, orderProducts, shipFee, total } = route.params
    const { status, isLoading, error } = useGetStatusOrder(orderId)
    const { mutate: cancelOrder } = useCancelOrder()
    const { mutate: takeUpOrder, error: takeUpOrderError, isSuccess } = useTakeUpOrder()
    const { mutate: setStatusOrder, error: setStatusOrderError } = useSetStatusOrder()

    const handleCancelOrder = (orderId, shipperId) => {
        cancelOrder({orderId: orderId, shipperId: shipperId})
    }

    const handleTakeUpOrder = (shipperId, orderId) => {
        takeUpOrder({shipperId: shipperId, orderId: orderId})
        if (takeUpOrderError) {
            showNotification(takeUpOrderError.message, 'error')
        }
        if (isSuccess) {
            showNotification('Nhận đơn hàng thành công', 'success')
        }
    }

    const handleSetStatusOrder = (orderId, status) => {
        setStatusOrder({orderId: orderId, status: status})
        if (setStatusOrderError) {
            showNotification(setStatusOrderError.message, 'error')
        }
    }

    return (
        <ScrollView className="flex-1">
            <SafeAreaView
                style={{
                    backgroundColor: '#f2f2f2',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.19,
                    shadowRadius: 5.62,
                    elevation: 6,
                }}>
                <View className="flex-row justify-between items-center mx-5">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Entypo
                            name="chevron-left"
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                    <View className="flex justify-between items-center">
                        <Text className="text-xl font-semibold">Chi tiết đơn hàng</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <FontAwesome5 name="map-marked-alt" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <View>
                <View className="mx-4">
                    <Text
                        className="text-base font-bold"
                        style={{ marginTop: hp(2) }}>
                        Thông tin người nhận
                    </Text>
                </View>

                <View className="shadow-lg mt-2">
                    <View className="p-4 bg-white rounded-lg mx-4 space-y-2">
                        <View className="flex-row items-center">
                            <Text
                                className="text-sm italic font-semibold"
                                style={{ color: colors.text_gray }}>
                                Họ và tên:{' '}
                            </Text>
                            <Text className="text-base">{address.HoTen}</Text>
                        </View>

                        <View className="flex-row items-center">
                            <Text
                                className="text-sm italic font-semibold"
                                style={{ color: colors.text_gray }}>
                                Số điện thoại:{' '}
                            </Text>
                            <Text className="text-base">{address.SoDienThoai}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View>
                <View className="mx-4">
                    <Text
                        className="text-base font-bold"
                        style={{ marginTop: hp(2) }}>
                        Địa chỉ giao hàng
                    </Text>
                </View>

                <View className="shadow-lg mt-2 ">
                    <View className="p-4 bg-white rounded-lg mx-4 space-y-2">
                        <TouchableOpacity onPress={() => navigation.navigate('Home')} className="flex-row items-center space-x-5">
                            <MaterialCommunityIcons
                                name="map-marker-radius"
                                size={24}
                                color="red"
                            />
                            <Text className="text-base flex-1">{address.DiaChi}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View>
                <View className="mx-4">
                    <Text
                        className="text-base font-bold"
                        style={{ marginTop: hp(2) }}>
                        Thông tin đơn hàng
                    </Text>
                </View>

                <View className="shadow-lg mt-2">
                    <View className="p-2 bg-white rounded-lg mx-4 space-y-2">
                        <OrderDetailList orderProducts={orderProducts} />
                    </View>
                </View>
            </View>

            <View>
                <View className="mx-4">
                    <Text
                        className="text-base font-bold"
                        style={{ marginTop: hp(2) }}>
                        Tổng cộng
                    </Text>
                </View>

                <View className="shadow-lg mt-2">
                    <View className="p-4 bg-white rounded-lg mx-4 space-y-2">
                        <View className="flex-row justify-between items-center">
                            <Text
                                className="text-base italic font-semibold"
                                style={{ color: colors.text_gray }}>
                                Tổng tiền hàng:{' '}
                            </Text>
                            <Text className="text-base">{formatPrice(total - shipFee)}</Text>
                        </View>

                        <View className="flex-row justify-between items-center">
                            <Text
                                className="text-base italic font-semibold"
                                style={{ color: colors.text_gray }}>
                                Phí ship:{' '}
                            </Text>
                            <Text className="text-base">{formatPrice(shipFee)}</Text>
                        </View>

                        <View className="flex-row justify-between items-center">
                            <Text
                                className="text-base italic font-semibold"
                                style={{ color: colors.text_gray }}>
                                Tổng cộng:{' '}
                            </Text>
                            <Text className="text-base">{formatPrice(total)}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ marginVertical: hp(5) }} className={`${status === 'Đã nhận' ? 'flex-row items-center justify-between mx-4' : 'mx-4'}`}>
                {status === "Đã nhận" && (
                    <TouchableOpacity onPress={() => handleSetStatusOrder(orderId, 'Giao hàng thành công')}>
                        <View className={`flex-row justify-center items-center bg-green-600 p-4 rounded-lg`} style={{width: status === 'Đã nhận' ? wp(45) : null}}>
                            <Text className="text-base font-bold text-white">Hoàn thành</Text>
                        </View>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={status === 'Đã nhận' ? () => handleCancelOrder(orderId, 'NV0004') : () => handleTakeUpOrder('NV0004', orderId)}>
                    <View className={`flex-row justify-center items-center ${status === 'Đã nhận' ? 'bg-red-400' : 'bg-green-600'} p-4 rounded-lg`} style={{width: status === 'Đã nhận' ? wp(45) : null}}>
                        <Text className="text-base font-bold text-white">{status === 'Đã nhận' ? "Huỷ đơn hàng" : "Nhận đơn hàng"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default OrderDetailScreen
