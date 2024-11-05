import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Icons from 'react-native-heroicons/solid'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Entypo from '@expo/vector-icons/Entypo'
import MessagesListDetail from '../components/messageListDetail'
import { useNavigation } from '@react-navigation/native'
import useSendMessage from '../customHooks/useSendMessage'
import useSeen from '../customHooks/useSeen'

const ios = Platform.OS === 'ios'
const ChatScreen = ({ route }) => {
    const navigation = useNavigation()
    const [message, setMessage] = useState('')
    const { mutate: sendMessage, error: sendMessageError } = useSendMessage()
    const { mutate: setSeen, error: setSeenError } = useSeen()
    const { KhachHang, Shipper, who, chatbot } = route.params
    const inputRef = useRef(null)

    const phoneNumber = '0123456789'

    const makeCall = () => {
        let phoneUrl = `tel:${phoneNumber}`

        Linking.canOpenURL(phoneUrl)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(phoneUrl)
                } else {
                    console.log('Không thể mở ứng dụng điện thoại: ' + phoneUrl)
                }
            })
            .catch((err) => console.error('An error occurred', err))
    }

    const handleSetSeen = () => {
        if (who.includes('NV')) {
            setSeen({ shipperId: Shipper.MaNhanVien, userId: KhachHang.MaKhachHang })
        }
    }

    const handleSendMessage = async () => {
        setMessage('')
        sendMessage({ shipperId: Shipper.MaNhanVien, userId: KhachHang.MaKhachHang, message: message })
    }

    useEffect(() => {
        if (!chatbot) {
            handleSetSeen()
        }
        inputRef.current.focus()
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={ios ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={0}
        >
            <SafeAreaView>
                <View className="flex-row justify-between items-center shadow-lg mx-4">
                    <View className="flex-row items-center space-x-4">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Entypo
                                name="chevron-left"
                                size={30}
                                color="black"
                            />
                        </TouchableOpacity>
                        <View className="flex-row items-center space-x-3">
                            {chatbot ? (
                                <>
                                    <Image
                                        source={{ uri: 'https://img.icons8.com/nolan/64/message-bot.png' }}
                                        contentFit="contain"
                                        style={{ width: wp(13), height: wp(13) }}
                                        className="rounded-full"
                                    />
                                    <Text className="text-base font-bold">Chat Bot If Else</Text>
                                </>
                            ) : (
                                <>
                                    <Image
                                        source={{ uri: Shipper.HinhAnh }}
                                        contentFit="contain"
                                        style={{ width: wp(13), height: wp(13) }}
                                        className="rounded-full"
                                    />
                                    <Text className="text-base font-bold">{Shipper.HoTen}</Text>
                                </>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity onPress={makeCall}>
                        <FontAwesome6
                            name="phone"
                            size={24}
                            color="orange"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* chat */}
            <View className="flex-1">
                {chatbot ? (
                    <MessagesListDetail
                        userId={KhachHang.MaKhachHang}
                        chatbot={'chatbot'}
                    />
                ) : (
                    <MessagesListDetail
                        userId={KhachHang.MaKhachHang}
                        shipperId={Shipper.MaNhanVien}
                    />
                )}
            </View>

            {/* input */}
            <View className="flex-row justify-between items-center mx-4 mb-3">
                <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                    <TextInput
                        ref={inputRef}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 mr-2 text-base"
                        value={message}
                        multiline={true}
                        onChangeText={(e) => setMessage(e)}
                    />
                    <TouchableOpacity
                        onPress={handleSendMessage}
                        className="bg-neutral-200 p-2 mr-[1px] rounded-full"
                    >
                        <Icons.PaperAirplaneIcon
                            size={hp(2.7)}
                            color={'#737373'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChatScreen
