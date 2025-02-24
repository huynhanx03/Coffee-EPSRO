import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Button from "../components/button";
import { colors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { Register, handleRegisterAccount } from "../controller/RegisterController";
import Toast from "react-native-toast-message";
import ShowToast from "../components/toast";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [isHide, setIsHide] = useState(true);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handleShowPassword = () => {
        setIsHide(!isHide);
    };

    const handleRegister = async () => {
        if (!username || !email || !password || !rePassword || !name) {
            ShowToast("error", "Đăng ký thất bại", "Vui lòng điền đầy đủ thông tin!")
            return;
        }
        if (password !== rePassword) {
            ShowToast("error", "Đăng ký thất bại", "Mật khẩu không khớp!")
            return;
        }

        const response = await handleRegisterAccount(name, username, phone, email, password);
        if (response.success) {
            Toast.show({
                type: "success",
                text1: 'Đăng ký thành công!',
                text2: "Chuyển hướng đến trang đăng nhập!",
                topOffset: 70,
                text1Style: {fontSize: 18},
                text2Style: {fontSize: 15},
                visibilityTime: 2000,
                onHide: () => navigation.navigate('Login'),
                onPress: () => navigation.navigate('Login')
            })
        } else {
            console.log(response)
            ShowToast("error", "Đăng ký thất bại", response.errors[0].msg)
        }
        
    };
    return (
        <View className="flex-1 justify-center items-center">
            <Image
                className="relative"
                source={require("../assets/images/bgOther.png")}
                style={{ width: width, height: height }}
            />
            <View className="absolute top-36">
                <Text className="text-4xl font-extrabold text-center mb-20" style-={{ color: colors.primary }}>
                    Chào bạn mới!
                </Text>
                <View className="space-y-3" style={{ width: wp(90) }}>
                    <TextInput
                        mode="outlined"
                        require = {true}
                        autoCapitalize="none"
                        label="Họ và tên"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        activeOutlineColor={colors.primary}
                    />
                    <TextInput
                        mode="outlined"
                        require = {true}
                        autoCapitalize="none"
                        label="Tên đăng nhập"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        activeOutlineColor={colors.primary}
                    />
                    <TextInput
                        mode="outlined"
                        autoCapitalize="none"
                        label="Email"
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        activeOutlineColor={colors.primary}
                    />
                    <TextInput
                        mode="outlined"
                        autoCapitalize="none"
                        label="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        activeOutlineColor={colors.primary}
                    />
                    <TextInput
                        mode="outlined"
                        label="Mật khẩu"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={isHide}
                        activeOutlineColor="#3b1d0c"
                        right={<TextInput.Icon icon={isHide ? "eye" : "eye-off"} onPress={handleShowPassword} />}
                    />
                    <TextInput
                        mode="outlined"
                        label="Nhập lại mật khẩu"
                        value={rePassword}
                        onChangeText={(text) => setRePassword(text)}
                        secureTextEntry={isHide}
                        activeOutlineColor={colors.primary}
                        right={<TextInput.Icon icon={isHide ? "eye" : "eye-off"} onPress={handleShowPassword} />}
                        className="mb-10"
                    />

                    {/* button register */}
                    <Button content="Đăng ký" handle={handleRegister} />
                </View>
            </View>
            <View className="flex flex-row justify-center items-center absolute bottom-10">
                <Text className="font-semibold">Đã có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="font-semibold" style={{ color: colors.active }}>
                        Đăng nhập tại đây!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterScreen;
