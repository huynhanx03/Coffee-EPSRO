import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OrderItem = (props) => {
    const navigation = useNavigation();
    const { order } = props

    return (
        <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', {orderId: order.MaDonHang, address: order.DiaChiGiaoHang, orderProducts: order.SanPham, shipFee: order.PhiVanChuyen, total: order.ThanhTien})} className='my-2 mx-4 flex'>
            <View className='px-2 rounded-lg bg-white'>
                <View className='flex-row space-x-5'>
                    <View className='items-center justify-center'>
                        <Image source={require("../../assets/images/logo.png")} contentFit='contain' style={{width: wp(20), height: hp(10)}}/>
                    </View>
                    <View className='my-2 flex-1'>
                        <Text className='text-lg font-semibold'>{order.MaDonHang}</Text>
                        <View className='flex-row items-center space-x-2'>
                            <Text className='text-base'>Số lượng: </Text>
                            <Text numberOfLines={1} className='text-base italic'>{Object.keys(order.SanPham).length} sản phẩm</Text>
                        </View>

                        <View className='flex-row space-x-2'>
                            <Text className='text-base'>Địa chỉ: </Text>
                            <Text numberOfLines={1} className='text-base flex-1'>{order.DiaChiGiaoHang.DiaChi}</Text>
                        </View>

                        <View className='flex-row items-center space-x-2'>
                            <Text className='text-base'>Khoảng cách: </Text>
                            <Text className='text-base'>20km</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default OrderItem
