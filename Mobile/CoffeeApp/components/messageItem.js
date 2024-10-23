import { View, Text, Image } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useEffect } from "react";

const MessageItem = (props) => {
    const { chat } = props
    console.log(" ~ file: messageItem.js:10 ~ MessageItem ~ chat:", chat)
    
    if (chat.MaNhanVien) {
        return (
            <View className="flex-row justify-end mb-2 items-center gap-2 mx-4">
                <View style={{ width: wp(80) }}>
                    <View className="flex self-end p-3 rounded-2xl bg-white border border-neutral-200">
                        <Text style={{ fontSize: hp(1.9) }}>{chat.ChiTiet}</Text>
                    </View>
                    <Text
                        className="italic text-gray-400"
                        style={{ alignSelf: 'flex-end' }}
                    >
                        {chat.ThoiGian}
                    </Text>
                </View>
            </View>
        )
    } else {
        return (
            <View
                style={{ width: wp(80) }}
                className="mb-2 mx-4"
            >
                <View className="flex self-start p-3 rounded-2xl bg-amber-400 border border-indigo-200">
                    <Text style={{ fontSize: hp(1.9) }}>{chat.ChiTiet}</Text>
                </View>
                <Text
                    className="italic text-gray-400"
                    style={{ alignSelf: 'flex-start' }}
                >
                    {chat.ThoiGian}
                </Text>
            </View>
        )
    }
};

export default MessageItem;
