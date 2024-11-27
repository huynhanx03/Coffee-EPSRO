import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatRoomItem from './ChatRoomItem'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import useGetAllUserChat from '../customHooks/useGetAllUserChat'
import { getUserData } from '../controller/StorageController'
import { ActivityIndicator } from 'react-native-paper'

const renderSeperator = () => {
    return <View className="bg-gray-200 h-0.5 ml-4 my-1" />
}

const ChatRoomList = () => {
    const [userData, setUserData] = useState(null) 

    const getCurrentUser = async () => {
        try {
            const data = await getUserData() 
            setUserData(data) 
        } catch (error) {
            console.error(error) 
        }
    }

    useEffect(() => {
        getCurrentUser() 
    }, [])
    
    const { allUserChat, error, isLoading, isFetching, refetch } = useGetAllUserChat(userData?.MaNguoiDung)

    useEffect(() => {
        refetch()
    }, [userData])
    return (
        <>
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
            >
                <FlatList
                    data={allUserChat}
                    renderItem={({ item }) => <ChatRoomItem item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={renderSeperator}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: hp(15), height: '100%' }}
                />
            </Animated.View>
        </>
    )
}

export default ChatRoomList
