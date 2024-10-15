import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import OrderRecentItem from './OrderRecentItem'
import useGetOrderSuccessByShipper from '../../hooks/useGetOrderSuccessByShipper'

const OrderRecentList = () => {
    const { orderSuccess, isLoading, error, isFetching, refetch } = useGetOrderSuccessByShipper('NV0004')
    const recentOrders = orderSuccess.slice(0, 5)
    return (
        <View>
            {isLoading && (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                />
            )}
            {recentOrders.map((order, index) => (
                <OrderRecentItem
                    key={index}
                    order={order}
                />
            ))}
        </View>
    )
}

export default OrderRecentList
