import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import EarningChart from '../../components/Chart/EarningChart'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import Entypo from '@expo/vector-icons/Entypo'
import Ionicons from '@expo/vector-icons/Ionicons'
import { formatPrice } from '../../utils'
import { useNavigation } from '@react-navigation/native'
import { colors } from '../../theme/Theme'
import OrderRecentList from '../../components/OrderRecent/OrderRecentList'

const EarningScreen = () => {
    const navigation = useNavigation()
    return (
        <ScrollView>
            <View
                style={{ height: hp(20), borderBottomLeftRadius: 45, borderBottomRightRadius: 45 }}
                className="bg-teal-500 flex-1">
                <SafeAreaView className="items-center mx-4">
                    <View className="flex-row justify-between items-center">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Entypo
                                name="chevron-left"
                                size={30}
                                color="black"
                            />
                        </TouchableOpacity>
                        <View className="flex-1 items-center">
                            <Text className="text-2xl font-bold">Lợi nhuận</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Setting')}
                            className="p-2 rounded-lg">
                            <Ionicons
                                name="settings"
                                size={30}
                                color="transparent"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text
                        className="text-white text-3xl font-bold"
                        style={{ marginTop: hp(0) }}>
                        {formatPrice(1000000)}
                    </Text>
                </SafeAreaView>

                <View className="mx-4 flex-row justify-around">
                    <View
                        className="bg-white shadow-md rounded-lg justify-center"
                        style={{ marginTop: -hp(2), width: wp(40), height: hp(10) }}>
                        <View className="p-5">
                            <Text className="text-lg font-semibold">Đơn hàng</Text>
                            <Text className="text-base">10 📦</Text>
                        </View>
                    </View>
                    <View
                        className="bg-white shadow-md rounded-lg justify-center"
                        style={{ marginTop: -hp(2), width: wp(40), height: hp(10) }}>
                        <View className="p-5">
                            <Text className="text-lg font-semibold">Đánh giá</Text>
                            <Text className="text-base">4.5 ⭐</Text>
                        </View>
                    </View>
                </View>
            </View>
            
            <View className='flex-1 mt-4'>
                <EarningChart />

            </View>

            <View className="mx-4 pb-10">
                <View
                    className="flex-row justify-between items-center"
                    style={{ marginVertical: hp(3) }}>
                    <Text className="text-xl font-bold">Đơn hàng gần đây</Text>
                    <Pressable onPress={() => navigation.navigate('OrderHistory')}>
                        <Text className="text-base text-blue-500 underline">Xem tất cả</Text>
                    </Pressable>
                </View>

                <View>
                    <View
                        className="p-5 py-6 bg-blue-300"
                        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        <Text>Tháng 9 / 2024</Text>
                    </View>
                    <View
                        className="bg-white shadow-lg"
                        style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                            <OrderRecentList /> 
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default EarningScreen
