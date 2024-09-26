import { View, Text, SafeAreaView, TouchableOpacity, Modal, ActivityIndicator, ScrollView, TextInput } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../theme/Theme'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <ScrollView className="mx-4">
            <SafeAreaView
                style={{ height: hp(100) }}
                className="flex-1">
                <View
                    className="flex justify-center items-center"
                    style={{ marginTop: hp(10) }}>
                    <Text
                        className="font-bold text-4xl"
                        style={{ color: colors.text(1) }}>
                        EPSRO SHIP
                    </Text>
                    <Text
                        className="font-semibold"
                        style={{ color: colors.text_gray }}>
                        DELIVERY SYSTEM
                    </Text>
                </View>

                <View
                    style={{ marginTop: hp(5) }}
                    className="flex justify-center items-center">
                    <Text className="text-base font-semibold">Đăng ký tài khoản shipper của bạn</Text>
                </View>

                <View
                    style={{ marginTop: hp(2) }}
                    className="space-y-4">
                    <View className="flex-row">
                        <View
                            className="rounded-l-lg items-center justify-center p-2"
                            style={{ width: wp(10), backgroundColor: colors.primary }}>
                            <FontAwesome name="user" size={24} color="white" />
                        </View>
                        <View className="rounded-r-lg p-3 px-5 flex-1 border border-gray-300">
                            <TextInput
                                className="text-base"
                                placeholder="Nhập họ và tên"
                            />
                        </View>
                    </View>

                    <View className="flex-row">
                        <View
                            className="rounded-l-lg items-center justify-center p-2"
                            style={{ width: wp(10), backgroundColor: colors.primary }}>
                            <FontAwesome
                                name="phone"
                                size={24}
                                color="white"
                            />
                        </View>
                        <View className="rounded-r-lg p-3 px-5 flex-1 border border-gray-300">
                            <TextInput
                                className="text-base"
                                placeholder="Nhập số điện thoại"
                            />
                        </View>
                    </View>

                    <View className="flex-row">
                        <View
                            className="rounded-l-lg items-center justify-center p-2"
                            style={{ width: wp(10), backgroundColor: colors.primary }}>
                            <Ionicons name="mail" size={24} color="white" />
                        </View>
                        <View className="rounded-r-lg p-3 px-5 flex-1 border border-gray-300">
                            <TextInput
                                className="text-base"
                                placeholder="Nhập email"
                            />
                        </View>
                    </View>

                    <View className="flex-row">
                        <View
                            className="rounded-l-lg items-center justify-center p-2"
                            style={{ width: wp(10), backgroundColor: colors.primary }}>
                            <MaterialIcons
                                name="password"
                                size={24}
                                color="white"
                            />
                        </View>
                        <View className="rounded-r-lg p-3 px-5 flex-1 border border-gray-300">
                            <TextInput
                                className="text-base"
                                placeholder="Nhập mật khẩu"
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: colors.primary }}>
                        <Text className="text-center text-white text-lg font-bold">Đăng ký</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row absolute bottom-10 self-center">
                    <Text className="font-semibold">Bạn đã có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text
                            className="font-semibold"
                            style={{ color: colors.active }}>
                            Quay về đăng nhập!
                        </Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={isLoading}
                    onRequestClose={() => setIsLoading(false)}>
                    <View
                        className="flex-1 justify-center items-center"
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View
                            className="bg-white p-5 rounded-lg justify-center items-center"
                            style={{ elevation: 5 }}>
                            <ActivityIndicator
                                size="large"
                                color="gray"
                                style={{ width: wp(28), height: wp(28) }}
                            />
                            <Text
                                className="text-base font-semibold"
                                style={{ color: colors.text(1) }}>
                                Đang đăng nhập...
                            </Text>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </ScrollView>
    )
}

export default RegisterScreen
