import { View, Text, FlatList } from 'react-native'
import React from 'react'
import OrderDetailItem from './OrderDetailItem'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const renderSeperator = () => {
    return <View className="bg-gray-200 h-0.5 ml-4" />
}

const OrderDetailList = (props) => {
    const { orderProducts } = props
    const products = Object.values(orderProducts)
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} className='mx-4'>
            <FlatList 
                data={products}
                renderItem={({ item }) => <OrderDetailItem product={item}/>}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeperator}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}   
            />
        </Animated.View>
    )
}

export default OrderDetailList
