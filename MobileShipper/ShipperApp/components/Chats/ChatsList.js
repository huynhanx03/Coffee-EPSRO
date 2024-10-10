import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import ChatItem from './ChatItem'
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';

const renderSeperator = () => {
    return (
        <View className='bg-gray-200 h-0.5 ml-4'/>
    )
}

const ChatsList = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({
            tabBarBadge: 10
        })
    }, [])
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
            <FlatList 
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                renderItem={() => <ChatItem />}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeperator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: hp(15)}}
            />
        </Animated.View>
    )
}

export default ChatsList
