import { View, Text, FlatList } from 'react-native'
import React from 'react'
import OrderHistoryItem from './OrderHistoryItem'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import useGetOrderSuccessByShipper from '../../hooks/useGetOrderSuccessByShipper'
import { useUserData } from '../../context/UserDataContext/UserDataContext'

const renderSeperator = () => {
    return (
        <View className='bg-gray-200 h-0.5 ml-4'/>
    )
}

const OrderHistoryList = () => {
    const { userData } = useUserData()
    const { orderSuccess, isLoading, error, isFetching, refetch } = useGetOrderSuccessByShipper(userData.MaNguoiDung);
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
            <FlatList 
                data={orderSuccess}
                renderItem={({ item }) => <OrderHistoryItem order={item}/>}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeperator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: hp(15)}}
            />
        </Animated.View>
    )
}

export default OrderHistoryList
