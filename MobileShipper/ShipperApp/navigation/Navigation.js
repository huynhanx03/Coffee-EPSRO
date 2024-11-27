import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen'
import BototmTab from './BottomTab'
import OrderDetailScreen from '../screens/OrderDetailScreen/OrderDetailScreen'
import ChatDetailScreen from '../screens/ChatDetailScreen/ChatDetailScreen'
import SettingScreen from '../screens/SettingScreen/SettingScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen/OrderHistoryScreen'
import EarningScreen from '../screens/EarningScreen/EarningScreen'
import { UserDataProvider } from '../context/UserDataContext/UserDataContext'

const Stack = createNativeStackNavigator()

export default function Navigation() {
    // Danh sách các màn hình không cần bọc context
    const excludedScreens = ['Welcome', 'Login', 'Register']

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                {/* Render từng màn hình, chỉ bọc context nếu không nằm trong danh sách loại trừ */}
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                {['HomeTab', 'OrderDetail', 'ChatDetail', 'Setting', 'OrderHistory', 'Earning'].map((screenName) => (
                    <Stack.Screen key={screenName} name={screenName}>
                        {(props) => (
                            <UserDataProvider>
                                {/* Wrap the specific screen component inside the UserDataProvider */}
                                {React.createElement(getComponent(screenName), props)}
                            </UserDataProvider>
                        )}
                    </Stack.Screen>
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// Hàm giúp ánh xạ tên màn hình với component tương ứng
function getComponent(screenName) {
    const components = {
        HomeTab: BototmTab,
        OrderDetail: OrderDetailScreen,
        ChatDetail: ChatDetailScreen,
        Setting: SettingScreen,
        OrderHistory: OrderHistoryScreen,
        Earning: EarningScreen,
    }
    return components[screenName]
}
