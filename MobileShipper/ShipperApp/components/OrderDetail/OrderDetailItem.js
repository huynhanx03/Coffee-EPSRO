import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { formatPrice } from '../../utils'

const OrderDetailItem = (props) => {
    const { product } = props
    
    return (
        <View className="flex-row space-x-4 items-center">
            <Image
                source={require('../../assets/images/coffeeDemo.png')}
                contentFit="contain"
                style={{ width: wp(15), height: hp(10) }}
            />
            <View className="flex-1">
                <Text className='text-base font-semibold'>{product.TenSanPham}</Text>
                <View className="flex-row space-x-2 items-center justify-between">
                    <View className="flex-row space-x-2 items-center">
                        <Text className='italic'>Số lượng: </Text>
                        <Text>{product.SoLuong}</Text>
                        <Text>x</Text>
                        <Text>{formatPrice(product.Gia)}</Text>
                    </View>
                    <Text> = {formatPrice(product.Gia * product.SoLuong)}</Text>
                </View>
            </View>
        </View>
    )
}

export default OrderDetailItem
