import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated'

const LoadingDot = () => {
    const translateY1 = useSharedValue(0)
    const translateY2 = useSharedValue(0)
    const translateY3 = useSharedValue(0)

    useEffect(() => {
        translateY1.value = withRepeat(
            withTiming(-10, {
                duration: 500,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        )
    }, [translateY1])

    useEffect(() => {
        setTimeout(() => {
            translateY2.value = withRepeat(
                withTiming(-10, {
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                }),
                -1,
                true
            )
        }, 200) // Delay for the second dot
    }, [translateY2])

    useEffect(() => {
        setTimeout(() => {
            translateY3.value = withRepeat(
                withTiming(-10, {
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                }),
                -1,
                true
            )
        }, 400) // Delay for the third dot
    }, [translateY3])

    const animatedStyle1 = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY1.value }],
        }
    })

    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY2.value }],
        }
    })

    const animatedStyle3 = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY3.value }],
        }
    })

    return (
        <View className="flex-row space-x-2 p-3 items-center justify-center bg-gray-300 rounded-full">
            <Animated.View
                style={[{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'gray' }, animatedStyle1]}
            />
            <Animated.View
                style={[{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'gray' }, animatedStyle2]}
            />
            <Animated.View
                style={[{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'gray' }, animatedStyle3]}
            />
        </View>
    )
}

export default LoadingDot
