import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { colors } from "../theme/Theme";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import OrdersScreen from "../screens/OrdersScreen/OrdersScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import UserScreen from "../screens/UserScreen/UserScreen";
import { useNewMessage } from "../context/NewMessageContext/NewMessageContext";
import { useEffect } from "react";
import useGetAllUserChat from "../hooks/useGetAllUserChat";
import { getDatabase, onValue, orderByChild, query, ref, equalTo } from "firebase/database";
import HomeScreenIndex from "../screens/HomeScreen";
import { useUserData } from "../context/UserDataContext/UserDataContext";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    const { userData } = useUserData()
    const { newMessage, setNewMessage } = useNewMessage();
    const { allUserChat, error, isLoading, isFetching, refetch } = useGetAllUserChat(userData?.MaNguoiDung);

    useEffect(() => {
        const count = allUserChat.filter((item) => item.NoiDung.DaXem === false && item.NoiDung.MaKhachHang).length;
        setNewMessage(count > 0 ? count : null);
    }, [allUserChat, isFetching]);

    useEffect(() => {
        if (userData) {
            const db = getDatabase();
            const messageRef = ref(db, `TinNhan/`);
            const q = query(messageRef, orderByChild("MaNhanVien"), equalTo(userData?.MaNguoiDung));
    
            const unsubscribe = onValue(q, (snapshot) => {
                refetch();
            });
    
            return () => unsubscribe();
        }
    }, [refetch, userData?.MaNguoiDung]);

    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                position: 'absolute',
                marginHorizontal: 12,
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                height: 80,
                left: 0,
                right: 0,
                bottom: 15,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
            },
            tabBarItemStyle: {
                top: hp(2)
            },
            tabBarLabelPosition: 'below-icon',
        }}>
            <Tab.Screen 
                name="Home"
                component={HomeScreenIndex}
                options={{
                    headerShown: false,
                    tabBarLabel: "Trang chủ",
                    tabBarLabelStyle: { color: colors.primary },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome6 name="house" size={30} color={colors.primary} />
                        ) : (
                            <FontAwesome6 name="house" size={30} color={'gray'} />
                        ),
                }}
            />
            <Tab.Screen 
                name="Orders"
                component={OrdersScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Đơn hàng",
                    tabBarLabelStyle: { color: colors.primary },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome name="th-list" size={30} color={colors.primary} />
                        ) : (
                            <FontAwesome name="th-list" size={30} color={'gray'} />
                        ),
                }}
            />
            <Tab.Screen 
                name="Chat"
                component={ChatScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Trò chuyện",
                    tabBarBadge: newMessage > 0 ? newMessage : null,
                    tabBarLabelStyle: { color: colors.primary },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Ionicons name="chatbox-ellipses" size={30} color={colors.primary} />
                        ) : (
                            <Ionicons name="chatbox-ellipses" size={30} color={'gray'} />
                        ),
                }}
            />
            <Tab.Screen 
                name="User"
                component={UserScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Người dùng",
                    tabBarLabelStyle: { color: colors.primary },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <FontAwesome name="user" size={30} color={colors.primary} />
                        ) : (
                            <FontAwesome name="user" size={30} color={'gray'} />
                        ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab