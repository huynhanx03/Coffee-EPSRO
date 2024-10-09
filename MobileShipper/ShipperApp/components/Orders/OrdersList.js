import { View, Text, FlatList } from 'react-native'
import React, {useState} from 'react'
import OrderItem from './OrderItem'
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import SegmentedButton from '../SegmentedButton/SegmentedButton';

const OrdersList = () => {
    const [selectedSegment, setSelectedSegment] = useState('Đang chờ');

    const handleSegmentChange = (segment) => {
        setSelectedSegment(segment);
    }
    return (
        <Animated.View entering={FadeIn} exiting={FadeOut} className='mb-5'>
            <SegmentedButton segments={['Đang chờ', 'Đã nhận']} onSegmentChange={handleSegmentChange}/>
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
        </Animated.View>
    )
}

export default OrdersList
