import { View, Text } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const MessageItem = () => {
    return (
        <View className="flex-row justify-end mb-2 items-center gap-2">
            <View style={{ width: wp(80) }}>
                <View className="flex self-end p-3 rounded-2xl bg-white border border-neutral-200">
                    <Text style={{ fontSize: hp(1.9) }}>Noi dung tin nhan</Text>
                </View>
                <Text
                    className="italic text-gray-400"
                    style={{ alignSelf: 'flex-end' }}>
                    02/10/2024
                </Text>
            </View>
        </View>
    )
}

export default MessageItem
