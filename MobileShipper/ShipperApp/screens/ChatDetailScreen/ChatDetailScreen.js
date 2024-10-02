import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import MessageList from '../../components/Messages/MessagesList'
import Entypo from '@expo/vector-icons/Entypo'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'expo-image'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'

const MessageScreen = () => {
    const navigation = useNavigation()
    const phoneNumber = '0123456789'
    const makeCall = () => {
        let phoneUrl = `tel:${phoneNumber}`;

        Linking.canOpenURL(phoneUrl)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(phoneUrl);
                } else {
                    console.log("Don't know how to open URI: " + phoneUrl);
                }
            })
            .catch((err) => console.error("An error occurred", err));
    }
    return (
        <View className='bg-white flex-1'>
            <SafeAreaView style={{height: hp(14)}} className='border-b-[0.2px] border-gray-300'>
                <View className="flex-row justify-between items-center shadow-lg mx-4">
                    <View className="flex-row items-center space-x-4">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Entypo
                                name="chevron-left"
                                size={30}
                                color="black"
                            />
                        </TouchableOpacity>
                        <View className='flex-row items-center space-x-3'>
                            <Image source={require('../../assets/images/avtDemo.png')} contentFit='contain' style={{width: wp(13), height: hp(10)}}/>
                            <Text className='text-base font-bold'>Ngo Nam</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={makeCall}>
                        <FontAwesome6 name="phone" size={24} color="orange" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <View>
                <MessageList />
            </View>
        </View>
    )
}

export default MessageScreen
