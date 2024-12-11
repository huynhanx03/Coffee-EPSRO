import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import * as Icons from "react-native-heroicons/mini";
import { colors } from "../theme";
import { MaterialIcons } from '@expo/vector-icons';
import ChatScreen from "../screens/ChatScreen";
import MenuScreen from "../screens/MenuScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import useGetAllUserChat from "../customHooks/useGetAllUserChat";
import { getDatabase, onValue, orderByChild, query, ref, equalTo } from "firebase/database";
import { useUser } from "../context/UserContext/UserContext";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    const [ newMessage, setNewMessage ] = useState(null);
    const { userData } = useUser()
    const { allUserChat, error, isLoading, isFetching, refetch } = useGetAllUserChat(userData?.MaNguoiDung);

    useEffect(() => {
        const count = allUserChat.filter((item) => item.NoiDung.DaXem === false && item.NoiDung.MaNhanVien).length;
        setNewMessage(count > 0 ? count : null);
    }, [allUserChat, isFetching]);

    useEffect(() => {
        const db = getDatabase();
        const messageRef = ref(db, `TinNhan/`);
        const q = query(messageRef, orderByChild("MaKhachHang"), equalTo(userData.MaNguoiDung));

        const unsubscribe = onValue(q, (snapshot) => {
            refetch();
        });

        return () => unsubscribe();
    }, [refetch]);
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Trang chủ",
                    tabBarLabelStyle: { color: colors.primary },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Icons.HomeIcon size={30} color={colors.primary} />
                        ) : (
                            <Icons.HomeIcon size={30} color={'gray'} />
                        ),
                }}
            />

            <Tab.Screen
                name="Menu"
                component={MenuScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Đồ ăn và nước uống",
                    tabBarLabelStyle: { color: colors.primary },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <MaterialIcons name="fastfood" size={30} color={colors.primary} />
                        ) : (
                            <MaterialIcons name="fastfood" size={30} color={"gray"} />
                        ),
                }}
            />

            <Tab.Screen
                name="Chat"
                component={ChatRoomScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Chat",
                    tabBarBadge: newMessage,
                    tabBarLabelStyle: { color: colors.primary },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Icons.ChatBubbleOvalLeftEllipsisIcon size={30} color={colors.primary} />
                        ) : (
                            <Icons.ChatBubbleOvalLeftEllipsisIcon size={30} color="gray" />
                        ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Thông tin",
                    tabBarLabelStyle: { color: colors.primary },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Icons.UserCircleIcon size={30} color={colors.primary} />
                        ) : (
                            <Icons.UserCircleIcon size={30} color={'gray'} />
                        ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
