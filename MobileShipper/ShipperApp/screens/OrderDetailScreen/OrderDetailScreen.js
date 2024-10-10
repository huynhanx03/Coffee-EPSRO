import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../../theme/Theme'
import { formatPrice } from '../../utils'
import OrderDetailList from '../../components/OrderDetail/OrderDetailList'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const OrderDetailScreen = () => {
    const navigation = useNavigation()
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

                    <TouchableOpacity>
                        <Entypo
                            name="heart"
                            size={30}
                            color="transparent"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <View>
                <View className='mx-4'>
                    <Text className='text-base font-bold' style={{marginTop: hp(2)}}>Thông tin người nhận</Text>
                </View>

                <View className='shadow-lg mt-2'>
                    <View className='p-4 bg-white rounded-lg mx-4 space-y-2'>
                        <View className='flex-row items-center'>
                            <Text className='text-sm italic font-semibold' style={{color: colors.text_gray}}>Họ và tên: </Text>
                            <Text className='text-base'>Ngô Nam</Text>
                        </View>

                        <View className='flex-row items-center'>
                            <Text className='text-sm italic font-semibold' style={{color: colors.text_gray}}>Số điện thoại: </Text>
                            <Text className='text-base'>0123456789</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View>
                <View className='mx-4'>
                    <Text className='text-base font-bold' style={{marginTop: hp(2)}}>Địa chỉ giao hàng</Text>
                </View>

                <View className='shadow-lg mt-2'>
                    <View className='p-4 bg-white rounded-lg mx-4 space-y-2'>
                        <View className='flex-row items-center space-x-5'>
                            <MaterialCommunityIcons name="map-marker-radius" size={24} color="red" />
                            <Text className='text-base'>123 Đường ABC, Quận XYZ, TP HCM</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View>
                <View className='mx-4'>
                    <Text className='text-base font-bold' style={{marginTop: hp(2)}}>Thông tin đơn hàng</Text>
                </View>

                <View className='shadow-lg mt-2'>
                    <View className='p-2 bg-white rounded-lg mx-4 space-y-2'>
                        <OrderDetailList />
                    </View>
                </View>
            </View>

            <View>
                <View className='mx-4'>
                    <Text className='text-base font-bold' style={{marginTop: hp(2)}}>Tổng cộng</Text>
                </View>

                <View className='shadow-lg mt-2'>
                    <View className='p-4 bg-white rounded-lg mx-4 space-y-2'>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-base italic font-semibold' style={{color: colors.text_gray}}>Tổng tiền hàng: </Text>
                            <Text className='text-base'>{formatPrice(100000)}</Text>
                        </View>

                        <View className='flex-row justify-between items-center'>
                            <Text className='text-base italic font-semibold' style={{color: colors.text_gray}}>Phí ship: </Text>
                            <Text className='text-base'>{formatPrice(10000)}</Text>
                        </View>

                        <View className='flex-row justify-between items-center'>
                            <Text className='text-base italic font-semibold' style={{color: colors.text_gray}}>Tổng cộng: </Text>
                            <Text className='text-base'>{formatPrice(110000)}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{marginVertical: hp(5)}}>
                <TouchableOpacity>
                    <View className='flex-row justify-center items-center bg-green-600 p-4 rounded-lg mx-4'>
                        <Text className='text-base font-bold text-white'>Nhận đơn hàng</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default OrderDetailScreen
