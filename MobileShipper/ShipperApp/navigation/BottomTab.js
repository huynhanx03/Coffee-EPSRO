import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import { colors } from "../theme/Theme";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import OrdersScreen from "../screens/OrdersScreen/OrdersScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import UserScreen from "../screens/UserScreen/UserScreen";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
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
                component={HomeScreen}
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
                    tabBarLabelStyle: { color: colors.primary },
                    tabBarBadge: 3,
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