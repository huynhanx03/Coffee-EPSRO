import { View, Text, FlatList } from 'react-native'
import React from 'react'
import OrderItem from './OrderItem'
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const OrdersList = () => {
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} className='mb-5'>
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
        </Animated.View>
    )
}

export default OrdersList
