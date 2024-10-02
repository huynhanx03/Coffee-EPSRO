import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import OrderHistoryList from '../../components/OrderHistory/OrderHistoryList'
import Entypo from '@expo/vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

const OrderHistoryScreen = () => {
    const navigation = useNavigation()
    return (
        <View className="flex-1">
            <SafeAreaView
                style={{
                    backgroundColor: '#f2f2f2',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.19,
                    shadowRadius: 5.62,
                    elevation: 6,
                }}>
                <View className="flex-row justify-between items-center mx-5">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Entypo
                            name="chevron-left"
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                    <View className="flex justify-between items-center">
                        <Text className="text-xl font-semibold">Lịch sử đơn hàng</Text>
                    </View>

                    <TouchableOpacity>
                        <Entypo
                            name="heart"
                            size={30}
                            color="transparent"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <View>
                <OrderHistoryList />
            </View>
        </View>
    )
}

export default OrderHistoryScreen
