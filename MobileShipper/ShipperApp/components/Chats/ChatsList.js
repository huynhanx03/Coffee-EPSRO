import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import ChatItem from './ChatItem'
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import useGetAllUserChat from '../../hooks/useGetAllUserChat'

const renderSeperator = () => {
    return (
        <View className='bg-gray-200 h-0.5 ml-4 my-1'/>
    )
}

const ChatsList = () => {
    const { allUserChat, error, isLoading, isFetching, refetch } = useGetAllUserChat('NV0004')

    return (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
            <FlatList 
                data={allUserChat}
                renderItem={({ item }) => <ChatItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={renderSeperator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: hp(15), height: '100%'}}
            />
        </Animated.View>
    )
}

export default ChatsList
