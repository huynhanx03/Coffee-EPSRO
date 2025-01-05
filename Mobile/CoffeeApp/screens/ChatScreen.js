import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
    KeyboardAvoidingView,
    Linking,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
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
import { blurhash } from '../utils'
import { useNotification } from '../context/ModalContext'
import useSendChatBot from '../customHooks/useSendChatBot'
import LoadingDot from '../components/LoadingDot'

const ios = Platform.OS === 'ios'
const ChatScreen = ({ route }) => {
    const navigation = useNavigation()
    const [message, setMessage] = useState('')
    const { showNotification } = useNotification()
    const { mutate: sendMessage } = useSendMessage()
    const { mutate: setSeen } = useSeen()
    const { mutate: sendMessageChatBot } = useSendChatBot()
    const { KhachHang, NhanVien, who, chatbot } = route.params
    const userId = useMemo(() => KhachHang.MaKhachHang || KhachHang.MaNguoiDung, [KhachHang])
    const inputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const phoneNumber = useMemo(() => NhanVien?.SoDienThoai, [NhanVien])

    const makeCall = () => {
        let phoneUrl = `tel:${phoneNumber}`

        Linking.canOpenURL(phoneUrl)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(phoneUrl)
                } else {
                    showNotification('Thiết bị không hỗ trợ', 'error')
                    console.log('Không thể mở ứng dụng điện thoại: ' + phoneUrl)
                }
            })
            .catch((err) => console.error('An error occurred', err))
    }

    const handleSetSeen = () => {
        if (who.includes('NV') || who.includes('ND') || who.includes('chatbot')) {
            setSeen({ shipperId: NhanVien.MaNhanVien, userId: userId })
        }
    }

    const handleSendMessage = async () => {
        if (!chatbot && NhanVien.MaNhanVien !== 'chatbot') {
            sendMessage({ shipperId: NhanVien.MaNhanVien, userId: userId, message: message })
        } else {
            sendMessage({ shipperId: 'chatbot', userId: userId, message: message })
            setIsLoading(true)
            sendMessageChatBot(
                { userId: userId, message: message },
                {
                    onSettled: () => {
                        setIsLoading(false)
                    },
                }
            )
        }
        setMessage('')
    }

    useEffect(() => {
        console.log(isLoading)
    }, [isLoading])

    useEffect(() => {
        if (!chatbot) {
            handleSetSeen()
        }
        inputRef.current.focus()
    }, [])

    return (
        <KeyboardAvoidingView behavior={ios ? 'padding' : 'height'} style={{ flex: 1 }} keyboardVerticalOffset={0}>
            <SafeAreaView>
                <View className="flex-row justify-between items-center shadow-lg mx-4">
                    <View className="flex-row items-center space-x-4">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Entypo name="chevron-left" size={30} color="black" />
                        </TouchableOpacity>
                        <View className="flex-row items-center space-x-3">
                            {chatbot ? (
                                <>
                                    <Image
                                        source={{ uri: 'https://img.icons8.com/nolan/64/message-bot.png' }}
                                        contentFit="contain"
                                        style={{ width: wp(13), height: wp(13) }}
                                        className="rounded-full"
                                        placeholder={{ blurhash }}
                                        transition={1000}
                                    />
                                    <Text className="text-base font-bold">Chat Bot If Else</Text>
                                </>
                            ) : (
                                <>
                                    <Image
                                        source={{ uri: NhanVien.HinhAnh }}
                                        contentFit="contain"
                                        style={{ width: wp(13), height: wp(13) }}
                                        className="rounded-full"
                                        placeholder={{ blurhash }}
                                        transition={1000}
                                    />
                                    <Text className="text-base font-bold">{NhanVien.HoTen}</Text>
                                </>
                            )}
                        </View>
                    </View>

                    {!chatbot ? (
                        <TouchableOpacity onPress={makeCall}>
                            <FontAwesome6 name="phone" size={24} color="orange" />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </SafeAreaView>

            {/* chat */}
            <View className="flex-1">
                {chatbot ? (
                    <MessagesListDetail userId={userId} chatbot={'chatbot'} />
                ) : (
                    <MessagesListDetail userId={userId} shipperId={NhanVien.MaNhanVien} />
                )}
            </View>

            {isLoading && (
                <View className='absolute' style={{ bottom: hp(8), left: wp(40)}}>
                    <LoadingDot />
                </View>
            )}

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
                    <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                        <Icons.PaperAirplaneIcon size={hp(2.7)} color={'#737373'} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChatScreen
