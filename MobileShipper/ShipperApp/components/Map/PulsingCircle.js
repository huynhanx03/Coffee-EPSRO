import React, { useEffect } from 'react';
import { Circle } from 'react-native-maps';
import Animated, { useSharedValue, useAnimatedProps, withRepeat, withTiming } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PulsingCircle = ({ center }) => {
    const radius = useSharedValue(100);

    useEffect(() => {
        radius.value = withRepeat(
            withTiming(150, { duration: 1000 }),
            -1,
            true
        );
    }, [radius]);

    const animatedProps = useAnimatedProps(() => ({
        radius: radius.value,
    }));

    return (
        <AnimatedCircle
            center={center}
            animatedProps={animatedProps}
            strokeColor="blue"
            fillColor="rgba(76, 175, 80, 0.8)"
            title='Bạn đang ở đây'
        />
    );
};

export default PulsingCircle;