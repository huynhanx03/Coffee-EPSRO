import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import OrdersList from '../../components/Orders/OrdersList'

const OrdersScreen = () => {
    return (
        <View className='flex-1'>
            <SafeAreaView
                style={{
                    backgroundColor: '#f2f2f2',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.19,
                    shadowRadius: 5.62,
                    elevation: 6,
                }}>
                <View className="flex justify-between items-center">
                    <Text className="text-xl font-semibold">Đơn hàng</Text>
                </View>
            </SafeAreaView>
    
            <View showsVerticalScrollIndicator={false}>
                <OrdersList />
            </View>
        </View>
    )
}

export default OrdersScreen
