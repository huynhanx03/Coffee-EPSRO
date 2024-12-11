import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import OrderItem from './OrderItem'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import SegmentedButton from '../SegmentedButton/SegmentedButton'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import useGetOrders from '../../hooks/useGetOrders'
import ModalLoading from '../Loading/ModalLoading'
import { ORDER_STATUS } from '../../constants'
import { useUserData } from '../../context/UserDataContext/UserDataContext'

const OrdersList = () => {
    const [selectedSegment, setSelectedSegment] = useState('Đang chờ')
    const { orders, isLoading, error, isFetching, refetch } = useGetOrders()
    const [displayOrders, setDisplayOrders] = useState([])
    const { userData } = useUserData()

    const handleSegmentChange = (segment) => {
        setSelectedSegment(segment)
    }

    useEffect(() => {
        let newDisplayOrders = [];
        if (orders.length > 0) {
            if (selectedSegment === 'Đang chờ') {
                newDisplayOrders = orders.filter((order) => !order.hasOwnProperty('MaNhanVien') || order.MaNhanVien === null || order.MaNhanVien === '')
            } else {
                newDisplayOrders = orders.filter(order => order.MaNhanVien === userData.MaNguoiDung && order.TrangThai != ORDER_STATUS.DELIVERED && order.TrangThai != ORDER_STATUS.RECEIVED)
            }
        }
        // Only update state if the new display orders are different from the current state
        if (JSON.stringify(newDisplayOrders) !== JSON.stringify(displayOrders)) {
            setDisplayOrders(newDisplayOrders);
        }
    }, [selectedSegment, orders])

    return (
        <>
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                className="mb-5">
                <FlatList
                    data={displayOrders}
                    keyExtractor={(item) => item.MaDonHang}
                    renderItem={({ item }) => <OrderItem order={item} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <SegmentedButton
                            segments={['Đang chờ', 'Đã nhận']}
                            onSegmentChange={handleSegmentChange}
                        />
                    }
                    contentContainerStyle={{ paddingBottom: hp(22), height: '100%' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={refetch}
                            tintColor="transparent"
                            colors={['transparent']}
                        />
                    }
                />
            </Animated.View>
            {isLoading &&
                <ModalLoading isLoading={true}/> 
            }
        </>
    )
}

export default OrdersList