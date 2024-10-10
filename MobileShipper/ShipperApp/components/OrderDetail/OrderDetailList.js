import { View, Text, FlatList } from 'react-native'
import React from 'react'
import OrderDetailItem from './OrderDetailItem'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const renderSeperator = () => {
    return <View className="bg-gray-200 h-0.5 ml-4" />
}

const OrderDetailList = () => {
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} className='mt-4 mx-4'>
            <FlatList 
                data={[1, 2, 3, 4, 5]}
                renderItem={() => <OrderDetailItem />}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeperator}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}   
            />
        </Animated.View>
    )
}

export default OrderDetailList
