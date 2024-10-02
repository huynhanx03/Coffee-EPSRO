import { View, Text } from 'react-native'
import React from 'react'
import OrderRecentItem from './OrderRecentItem'

const OrderRecentList = () => {
    return (
        <View>
            <OrderRecentItem />
            <OrderRecentItem />
            <OrderRecentItem />
            <OrderRecentItem />
            <OrderRecentItem />
        </View>
    )
}

export default OrderRecentList
