import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { formatPrice } from '../../utils'
import { colors } from '../../theme/Theme'

const OrderItem = (props) => {
    const navigation = useNavigation();
    const { order } = props
    return (
        <TouchableOpacity onPress={() => console.log('a')} className='shadow-md my-2 flex'>
            <View className='px-2 rounded-lg bg-white mx-4'>
                <View className='flex-row space-x-5'>
                    <View className='items-center justify-center'>
                        <Image source={require("../../assets/images/logo.png")} contentFit='contain' style={{width: wp(15), height: hp(8)}}/>
                    </View>
                    <View className='my-2 flex-1'>
                        <Text className='text-lg font-semibold'>{order.MaDonHang}</Text>

                        <View className='flex-row space-x-5'>
                            <Text className='text-base font-semibold' style={{color: colors.text_gray}}>Địa chỉ: </Text>
                            <Text numberOfLines={1} className='text-base flex-1'>{order.DiaChiGiaoHang.DiaChi}</Text>
                        </View>

                        <View className='flex-row items-center space-x-5'>
                            <Text className='text-base font-semibold' style={{color: colors.text_gray}}>Nhận được: </Text>
                            <Text className='text-base'>{formatPrice(order.PhiVanChuyen)}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default OrderItem
