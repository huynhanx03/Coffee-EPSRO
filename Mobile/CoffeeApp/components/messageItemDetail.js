import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const MessageItemDetail = (props) => {
    const { chat } = props;
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 500 });
        translateY.value = withTiming(0, { duration: 500 });
    }, [opacity, translateY]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    if (chat.MaKhachHang) {
        return (
            <Animated.View style={animatedStyle}>
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
            </Animated.View>
        );
    } else {
        return (
            <Animated.View style={animatedStyle}>
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
            </Animated.View>
        );
    }
};

export default MessageItemDetail;