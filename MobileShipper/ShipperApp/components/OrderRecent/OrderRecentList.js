import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import OrderRecentItem from './OrderRecentItem'
import useGetOrderSuccessByShipper from '../../hooks/useGetOrderSuccessByShipper'
import { useUserData } from '../../context/UserDataContext/UserDataContext'

const OrderRecentList = () => {
    const { userData } = useUserData()
    const { orderSuccess, isLoading, error, isFetching, refetch } = useGetOrderSuccessByShipper(userData.MaNguoiDung)
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
