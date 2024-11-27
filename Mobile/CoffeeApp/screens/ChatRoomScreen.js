import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getUserData } from '../controller/StorageController'
import ChatRoomList from '../components/ChatRoomList'
import Draggable from 'react-native-draggable'
import { useNavigation } from '@react-navigation/native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Tooltip from '../components/tooltip'
import { useUser } from '../context/UserContext/UserContext'

const ChatRoomScreen = () => {
    const navigation = useNavigation()
    const { userData: user } = useUser()
    return (
        <View className='flex-1'>
            <SafeAreaView
                style={{
                    backgroundColor: '#f2f2f2',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.19,
                    shadowRadius: 5.62,
                    elevation: 6,
                }}>
                <View className="flex justify-between items-center">
                    <Text className="text-xl font-semibold">Tin nhắn</Text>
                </View>
            </SafeAreaView>
    
            <View>
                <ChatRoomList />
            </View>

            <Draggable
                x={wp(80)}
                y={hp(82)}
                minX={wp(5)}
                maxX={wp(95)}
                minY={hp(5)}
                maxY={hp(90)}
                renderSize={24}
                renderColor="amber"
                isCircle
            >
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ChatDetail', {chatbot: true, KhachHang: user})}
                        className="p-3 bg-white rounded-full"
                    >
                        <Image source={{uri: "https://img.icons8.com/nolan/64/message-bot.png"}} resizeMode='contain' width={wp(12)} height={wp(12)}/>
                        <Tooltip visible={true} message="Trò chuyện với ChatBot của chúng tôi!" />
                    </TouchableOpacity>
                </View>
            </Draggable>
        </View>
    )
}

export default ChatRoomScreen
