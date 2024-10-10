import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../../theme/Theme'
import { useNavigation } from '@react-navigation/native'

const ChatItem = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ChatDetail')} className='mx-4'>
            <View className='flex-row space-x-3'>
                <View>
                    <Image source={require('../../assets/images/avtDemo.png')} contentFit='contain' style={{width: wp(15), height: hp(10)}}/>
                </View>

                <View className='space-y-1 flex-1' style={{marginTop: wp(5)}}>
                    <View>
                        <Text className='text-base font-semibold' style={{color: colors.text}}>Huỳnh Nhân</Text>
                    </View>

                    <View className='flex-row items-center'>
                        <Text numberOfLines={1} style={{flex: 3, marginRight: wp(3)}}>Đơn hàng của tôi khi nào tới tới tới tới tới tới tới tới tới</Text>
                        <Text style={{flex: 1}}>29/09/2024</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem
