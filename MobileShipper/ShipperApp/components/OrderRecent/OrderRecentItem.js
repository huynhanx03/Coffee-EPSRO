import { View, Text } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import React from 'react'
import { formatPrice } from '../../utils'

const OrderRecentItem = (props) => {
    const { order } = props
    return (
        <View className="px-5 py-5 space-y-3">
            <View className="flex-row justify-between items-center">
                <View className="flex-row space-x-2 items-center">
                    <FontAwesome5
                        name="receipt"
                        size={24}
                        color="#4185f4"
                    />
                    <Text className="text-base">Đơn hàng {order.MaDonHang}</Text>
                </View>
                <View className="flex-row items-center space-x-3">
                    <FontAwesome6
                        name="money-bill-trend-up"
                        size={24}
                        color="#77eb65"
                    />
                    <Text
                        numberOfLines={1}
                        className="text-base font-semibold">
                        {formatPrice(order.ThanhTien)}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default OrderRecentItem
