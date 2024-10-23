import { View, Text, TouchableOpacity, Linking, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MessageList from '../../components/Messages/MessagesList'
import Entypo from '@expo/vector-icons/Entypo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Feather from '@expo/vector-icons/Feather';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import useSendMessage from '../../hooks/useSendMessage'
import useSeen from '../../hooks/useSeen'

const ios = Platform.OS === 'ios'
const MessageScreen = ({ route }) => {
    const navigation = useNavigation()
    const { KhachHang, Shipper, who } = route.params
    const { mutate: sendMessage, error: sendMessageError } = useSendMessage()
    const { mutate: setSeen, error: setSeenError, isLoading: setSeenLoading } = useSeen()
    const [message, setMessage] = useState('')
    const scrollRef = useRef(null);

    const phoneNumber = '0123456789'

    const handleSendMessage = (message) => {
        sendMessage({shipperId: 'NV0004', userId: userId, message: message})
        setMessage('')
    }

    const updateScrollView = () => {
        setTimeout(() => {
            scrollRef?.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const handleSetSeen = () => {
        if (who.includes('KH')) {
            setSeen({shipperId: 'NV0004', userId: userId})
        }
    }

    useEffect(() => {
        handleSetSeen()
        updateScrollView()
    }, [])

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

    return (
        <KeyboardAvoidingView
            className="bg-white flex-1"
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
                            <Image
                                source={{ uri: KhachHang.HinhAnh }}
                                contentFit="contain"
                                style={{ width: wp(13), height: wp(13) }}
                                className="rounded-full"
                            />
                            <Text className="text-base font-bold">{KhachHang.HoTen}</Text>
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

            <ScrollView>
                <MessageList userId={KhachHang.MaKhachHang} shipperId={Shipper.MaNhanVien} />
            </ScrollView>

            <View className="flex-row justify-between items-center mx-4 mb-5">
                <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                    <TextInput
                        placeholder="Chat with me..."
                        className="flex-1 mr-2 text-base"
                        value={message}
                        multiline={true}
                        onChangeText={(e) => setMessage(e)}
                        onFocus={updateScrollView}
                    />
                    <TouchableOpacity
                        onPress={() => handleSendMessage(message)}
                        className="bg-neutral-200 p-2 mr-[1px] rounded-full"
                    >
                        <Feather name="send" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default MessageScreen
