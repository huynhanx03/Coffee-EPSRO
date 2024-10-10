import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Map from '../../components/Map/Map'
import { colors } from '../../theme/Theme/index'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import { setStatusShipper } from '../../controllers/UserController'
import { useNotification } from '../../context/NotificationContext/NotificationContext'

const HomeScreen = () => {
    const [isVisible, setIsVisible] = useState(false)
    const opacity = useSharedValue(0)
    const translateY = useSharedValue(50)
    const height = useSharedValue(0)
    const { showNotification } = useNotification()

    const setStatus = async (status) => {
        try {
            const response = await setStatusShipper('NV0004', status)
            showNotification(response.message, 'success')
            return response
        } catch (error) {
            showNotification(error.message, 'error')
            return { success: false }
        }
    }

    useEffect(() => {
        setIsVisible(true)
        opacity.value = withTiming(1, { duration: 500 })
        translateY.value = withSpring(0, { damping: 10 })
        height.value = withTiming(hp(20), { duration: 500 })
    }, [])

    const handleOnOff = async () => {
        if (!isVisible) {
            const result = await setStatus('offline')
            if (result.success) {
                setIsVisible(true)
                opacity.value = withTiming(1, { duration: 500 })
                translateY.value = withSpring(0, { damping: 10 })
                height.value = withTiming(hp(20), { duration: 500 })
            }
        } else {
            const result = await setStatus('online')
            if (result.success) {
                opacity.value = withTiming(0, { duration: 500 })
                translateY.value = withSpring(50, { damping: 10 })
                height.value = withTiming(0, { duration: 500 })
                setTimeout(() => {
                    setIsVisible(false)
                }, 500)
            }
        }
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
            height: height.value,
        }
    })

    return (
        <View className="flex-1">
            <Map />
            {!isVisible &&
            (
                <TouchableOpacity
                    onPress={handleOnOff}
                    className="absolute top-[70px] right-5">
                    <FontAwesome
                        name="power-off"
                        size={35}
                        color="#f56969"
                    />
                </TouchableOpacity>
            )}

            {isVisible && (
                <Animated.View
                    style={animatedStyle}
                    className="z-10">
                    <View
                        className="bg-white rounded-xl shadow-xl flex-row justify-between"
                        style={{ flex: 1, paddingBottom: hp(9) }}>
                        <View className="flex items-center justify-center my-5 mx-4">
                            <Text className="text-lg font-semibold">Bạn đang offline!</Text>
                        </View>

                        <View className="flex items-center justify-center my-5 flex-row mx-4">
                            <TouchableOpacity
                                onPress={handleOnOff}
                                className="p-5 rounded-full"
                                style={{
                                    backgroundColor: colors.active,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                }}>
                                <Text className="text-white text-base font-semibold tracking-wide">Online ngay 🛵</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            )}
        </View>
    )
}

export default HomeScreen