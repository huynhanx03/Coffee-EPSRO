import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { colors } from '../theme'

const Tooltip = ({ visible, message, duration = 3000 }) => {
    const opacity = useSharedValue(0)

    useEffect(() => {
        if (visible) {
            opacity.value = withTiming(1, { duration: 300 })

            const timer = setTimeout(() => {
                opacity.value = withTiming(0, { duration: 300 });
            }, duration);

            return () => clearTimeout(timer);
        } else {
            opacity.value = withTiming(0, { duration: 300 })
        }
    }, [visible, duration, opacity])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        }
    })

    return (
        <Animated.View style={[styles.tooltipContainer, animatedStyle]}>
            <Text style={styles.tooltipText}>{message}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tooltipContainer: {
        position: 'absolute',
        bottom: wp(18),
        left: -wp(40),
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        zIndex: 1000,
        width: wp(45),
    },
    tooltipText: {
        color: 'black',
        fontSize: wp(3.5),
    },
})

export default Tooltip
