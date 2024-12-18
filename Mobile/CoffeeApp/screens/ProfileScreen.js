import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React, { useEffect, useMemo, useState } from "react";
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as Icons from "react-native-heroicons/solid";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { useNotification } from "../context/ModalContext";
import { getUserData, removeToken } from "../controller/StorageController";
import { getUserRankById } from "../controller/UserController";
import { clearCart } from "../redux/slices/cartSlice";
import { colors } from "../theme";
import { blurhash } from "../utils";

const width = Dimensions.get("window").width;

const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [userRank, setUserRank] = useState(null);
    const [rank, setRank] = useState("");
    const { showNotification } = useNotification();

    const getUser = async () => {
        try {
            const userData = await getUserData();
            setUser(userData);
        } catch (error) {
            console.log(error);
        }
    };

    const getRank = async () => {
        try {
            const userRank = await getUserRankById(user?.MaNguoiDung);
            setUserRank(userRank);
        } catch (error) {
            console.log(error)
        }
    }

    const handleRank = useMemo(() => {
        if (+userRank?.DiemTichLuy >= 0 && +userRank?.DiemTichLuy < 50) {
            setRank("Thành viên mới")
            return;
        } else if (+userRank?.DiemTichLuy >= 50 && +userRank?.DiemTichLuy < 100) {
            setRank("Bạc")
            return;
        } else if (+userRank?.DiemTichLuy >= 100 && +userRank?.DiemTichLuy < 500) {
            setRank("Vàng")
            return;
        } else if (+userRank?.DiemTichLuy >= 500) {
            setRank("Kim Cương")
            return;
        }

    }, [userRank])

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getRank();
    }, [user])

    const logOut = async () => {
        await removeToken();
        navigation.replace("Login");
        dispatch(clearCart());
    }
    const handleLogout = () => {
        showNotification("Bạn có chắc chắn muốn đăng xuất không?", "inform", logOut)
    };

    return (
        <View className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* avatar */}
                <View style={{ height: hp(25) }} className="bg-yellow-950">
                    <View
                        className="justify-center items-center"
                        style={{ marginTop: hp(9) }}
                    >
                        <Text className="text-white text-xl font-bold text-center">
                            Hồ sơ của tôi
                        </Text>
                    </View>
                    <View
                        className="justify-center items-center"
                        style={{ marginTop: hp(6) }}
                    >
                        <Image
                            source={{
                                uri: user?.HinhAnh
                                    ? user.HinhAnh
                                    : "https://user-images.githubusercontent.com/5709133/50445980-88299a80-0912-11e9-962a-6fd92fd18027.png",
                            }}
                            contentFit="cover"
                            placeholder={{ blurhash }}
                            style={{ width: hp(12), height: hp(12) }}
                            transition={1000}
                            className="rounded-full"
                        />
                    </View>
                </View>

                {/* info */}
                <View className="space-y-1" style={{ marginTop: wp(15) }}>
                    <View className="flex-row justify-center gap-2 items-center">
                        <Text className="text-lg font-semibold text-center">
                            {user?.HoTen}
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Edit")}
                            className="p-1 bg-gray-300 rounded-full"
                        >
                            <Icons.PencilIcon size={20} color="#000000" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-center text-gray-500">
                        {user?.Email}
                    </Text>
                    <Text className="text-center text-gray-500">
                        {user?.SoDienThoai}
                    </Text>
                </View>

                {/* rank */}
                <View className='mx-5'>
                    <View className="flex-row justify-between items-center p-4 border rounded-[14px]" style={{ borderColor: "#9d9d9d", marginTop: wp(10) }}>
                        <View className='flex-row gap-5 items-center'>
                            <Image source={require("../assets/icons/icons8-rank-48.png")} style={{width: wp(8), height: wp(8)}}/>
                            <Text className="text-lg font-semibold">Điểm tích luỹ</Text>
                        </View>
                        <Text className="text-lg font-semibold">
                            {userRank?.DiemTichLuy}
                        </Text>
                    </View>

                    <View className="flex-row justify-between items-center p-4 border rounded-[14px]" style={{ borderColor: "#9d9d9d", marginTop: wp(10) }}>
                        <View className='flex-row gap-5 items-center'>
                            {rank === "Đồng" ? (
                                <Image source={require("../assets/images/Bronze.png")} style={{width: wp(8), height: wp(8)}}/>
                            ) : rank === "Bạc" ? (
                                <Image source={require("../assets/images/Silver.png")} style={{width: wp(8), height: wp(8)}}/>
                            ) : rank === "Vàng" ? (
                                <Image source={require("../assets/images/Gold.png")} style={{width: wp(8), height: wp(8)}}/>
                            ) : rank === "Kim Cương" ? (
                                <Image source={require("../assets/images/Diamond.png")} style={{width: wp(8), height: wp(8)}}/>
                            ) : (
                                <Image source={require('../assets/images/logo.png')} style={{width: wp(8), height: wp(8)}} />
                            )}
                            <Text className="text-lg font-semibold">Cấp bậc</Text>
                        </View>
                        <Text className="text-lg font-semibold">{rank}</Text>
                    </View>
                </View>

                {/* menu item */}
                <View className="mx-5">
                    <View
                        className="p-4 border rounded-[14px]"
                        style={{ borderColor: "#9d9d9d", marginTop: wp(10) }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate("OrderInfo")}
                            className="flex-row justify-between items-center"
                        >
                            <View className="flex-row items-center gap-5">
                                <Icons.ClipboardDocumentListIcon
                                    size={30}
                                    color={colors.active}
                                />
                                <Text className="text-lg font-semibold">
                                    Thông tin đơn hàng
                                </Text>
                            </View>

                            <Icons.ChevronRightIcon
                                size={30}
                                color={colors.text(0.5)}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* logout */}
            </ScrollView>
            <View className="mx-5 m-5">
                <TouchableOpacity
                    onPress={handleLogout}
                    className="p-4 bg-red-500 rounded-lg"
                >
                    <Text className="text-white text-center text-lg font-semibold">
                        Đăng xuất
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;
