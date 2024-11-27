import { View, Text, ScrollView, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { formatPrice } from '../../utils'
import { LinearGradient } from 'expo-linear-gradient'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../../theme/Theme'
import { useNavigation } from '@react-navigation/native'
import useGetOrderSuccessByShipper from '../../hooks/useGetOrderSuccessByShipper'
import useGetProfitByShipper from '../../hooks/useGetProfitByShipper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserData } from '../../context/UserDataContext/UserDataContext'
import { setStatusShipper } from '../../controllers/UserController'
import { useNotification } from '../../context/NotificationContext/NotificationContext'

const UserScreen = () => {
    const navigation = useNavigation()
    const { showNotification } = useNotification()
    const { orderSuccess, isLoading, error, isFetching, refetch } = useGetOrderSuccessByShipper('NV0004')
    const { profit, isLoading: isLoadingProfit, error: errorProfit, isFetching: isFetchingProfit, refetch: refetchProfit } = useGetProfitByShipper('NV0004')
    const { userData } = useUserData()

    const totalRevenue = profit.reduce((acc, item) => acc + item.DoanhThu, 0)

    const handleLogOut = async () => {
        try {
            await AsyncStorage.removeItem('token')
            await AsyncStorage.removeItem('user')
            await setStatusShipper(userData.MaNguoiDung, 'offline')
            navigation.replace('Login')
        } catch (error) {
            showNotification('Lỗi khi đăng xuất', 'error')
        }
    }

    return (
        <View className="flex-1 bg-white">
            <View
                style={{ height: hp(18) }}
                className="bg-blue-500">
                <View
                    className="justify-center items-center"
                    style={{ marginTop: hp(8) }}>
                    <Text className="text-white text-xl font-bold text-center">Hồ sơ của tôi</Text>
                </View>
                <View
                    className="justify-center items-center"
                    style={{ marginTop: hp(0.7) }}>
                    <Image
                        source={require('../../assets/images/avtDemo.png')}
                        contentFit="cover"
                        style={{ width: hp(12), height: hp(12) }}
                        transition={1000}
                        className="rounded-full"
                    />
                </View>
            </View>

            <ScrollView
                style={{ marginTop: wp(12) }}>
                <View className="mb-2 mx-4">
                    <Text className="text-lg font-semibold mt-5">Thông tin người dùng</Text>
                </View>

                <LinearGradient
                    className="p-5 rounded-lg mx-4"
                    colors={['#b6ebb0', '#78faf6']}
                    locations={[0, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}>
                    <View className="flex-row space-x-2 items-center">
                        <Text
                            className="font-semibold italic text-base"
                            style={{ color: colors.text_gray }}>
                            Họ và tên:{' '}
                        </Text>
                        <Text className='text-lg font-semibold'>Nguyễn Văn A</Text>
                    </View>

                    <View className="flex-row space-x-2 my-5 items-center">
                        <Text
                            className="font-semibold italic text-base"
                            style={{ color: colors.text_gray }}>
                            Số điện thoại:{' '}
                        </Text>
                        <Text className='text-lg font-semibold'>0123456789</Text>
                    </View>

                    <View className="flex-row space-x-2 items-center">
                        <Text
                            className="font-semibold italic text-base"
                            style={{ color: colors.text_gray }}>
                            Email:{' '}
                        </Text>
                        <Text className='text-lg font-semibold'>a@gmail.com</Text>
                    </View>
                </LinearGradient>

                {/* <View className='bg-gray-300 mt-4' style={{height: hp(0.2)}}/> */}

                <View className="mb-2 mx-4">
                    <Text className="text-lg font-semibold mt-5">Lịch sử người dùng</Text>
                </View>

                <View className="flex-row justify-between items-center mx-4">
                    <Pressable onPress={() => navigation.navigate('OrderHistory')}>
                        <LinearGradient
                            className="p-5 rounded-lg"
                            style={{ width: wp(45), height: hp(15) }}
                            colors={['#b6ebb0', '#78faf6']}
                            locations={[0, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}>
                            <View className='flex-1'>
                                <View>
                                    <Text className='font-semibold text-center' style={{fontSize: hp(2)}}>Đơn hàng đã giao</Text>
                                </View>
                                <View className='flex-1 justify-center items-center flex-row space-x-2'>
                                    {
                                        isLoading ? <ActivityIndicator /> : <Text style={{fontSize: hp(3)}}>{orderSuccess?.length}</Text>
                                    }
                                    <Text style={{fontSize: hp(3)}}>📦</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </Pressable>

                    <Pressable onPress={() => navigation.navigate('Earning', {profit: totalRevenue, orderCount: orderSuccess.length})}>
                        <LinearGradient
                            className="p-5 rounded-lg"
                            style={{ width: wp(45), height: hp(15) }}
                            colors={['#b6ebb0', '#78faf6']}
                            locations={[0, 1]}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}>
                            <View className='flex-1'>
                                <View>
                                    <Text className='font-semibold text-center' style={{fontSize: hp(2)}}>Lợi nhuận 💲 </Text>
                                </View>
                                <View className='flex-1 justify-center items-center'>
                                    {isLoadingProfit ? <ActivityIndicator /> : <Text style={{fontSize: hp(3)}}>{formatPrice(totalRevenue)}</Text>}
                                </View>
                            </View>
                        </LinearGradient>
                    </Pressable>
                </View>

                <View>
                    <TouchableOpacity onPress={handleLogOut} className='bg-red-400 rounded-lg shadow-md p-4 mx-4' style={{marginTop: hp(15)}}>
                        <Text className='text-lg font-bold text-center'>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default UserScreen
