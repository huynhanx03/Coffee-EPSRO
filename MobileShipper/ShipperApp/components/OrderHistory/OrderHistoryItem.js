import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { formatPrice } from '../../utils'

const OrderItem = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('OrderDetail')} className='my-2 flex'>
            <View className='px-2 rounded-lg shadow-md bg-white'>
                <View className='flex-row space-x-5'>
                    <View className='items-center justify-center'>
                        <Image source={require("../../assets/images/logo.png")} contentFit='contain' style={{width: wp(20), height: hp(10)}}/>
                    </View>
                    <View className='my-2 flex-1'>
                        <Text className='text-lg font-semibold'>Mã đơn hàng</Text>

                        <View className='flex-row space-x-5'>
                            <Text className='text-base'>Địa chỉ: </Text>
                            <Text numberOfLines={1} className='text-base flex-1'>Tân Tiến, Đồng Phú, Bình Phước</Text>
                        </View>

                        <View className='flex-row items-center space-x-5'>
                            <Text className='text-base'>Khoảng cách: </Text>
                            <Text className='text-base'>20km</Text>
                        </View>

                        <View className='flex-row items-center space-x-5'>
                            <Text className='text-base'>Nhận được: </Text>
                            <Text className='text-base'>{formatPrice(15000)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default OrderItem
