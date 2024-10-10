import { View, Text, Pressable } from 'react-native'
import React, {useState, useMemo} from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const SegmentedButton = ({ segments, onSegmentChange }) => {
    const [selectedSegment, setSelectedSegment] = useState(segments[0]);
    const translateX = useSharedValue(0);

    const segmentWidth = useMemo(() => {
        return (wp(100) - 32) / segments.length;
    })

    const handleSegmentPress = (segment, index) => {
        setSelectedSegment(segment);
        onSegmentChange(segment);
        translateX.value = withTiming(index * segmentWidth);
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <View className="relative flex-row justify-between bg-gray-200 rounded-lg p-1 mx-4 my-5">
            <Animated.View
                style={[animatedStyle, { width: segmentWidth }]}
                className="absolute top-0 bottom-0 bg-blue-500 rounded-lg"
            />
            {segments.map((segment, index) => (
                <Pressable
                    key={segment}
                    onPress={() => handleSegmentPress(segment, index)}
                    className="flex-1 items-center py-2 rounded-lg"
                >
                    <Text className={`${selectedSegment === segment ? 'text-white' : 'text-black'} text-base font-semibold`}>{segment}</Text>
                </Pressable>
            ))}
        </View>
    );
};

export default SegmentedButton