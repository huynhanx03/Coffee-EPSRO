import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import ChatItem from './ChatItem'
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import useGetAllUserChat from '../../hooks/useGetAllUserChat'
import { useNotification } from '../../context/NotificationContext/NotificationContext';
import { useUserData } from '../../context/UserDataContext/UserDataContext';

const renderSeperator = () => {
    return (
        <View className='bg-gray-200 h-0.5 ml-4 my-1'/>
    )
}

const ChatsList = () => {
    const { showNotification } = useNotification()
    const { userData } = useUserData()
    const { allUserChat, error, isLoading, isFetching, refetch } = useGetAllUserChat(userData?.MaNguoiDung)

    useEffect(() => {
        if (error) {
            showNotification(error.message, 'error')
        }   
    }, [error])

    return (
        <>
            { isLoading && <ActivityIndicator size="large" color="#0000ff" /> }
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
        </>
    )
}

export default ChatsList
