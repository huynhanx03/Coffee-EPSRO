import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import BototmTab from './BottomTab';
import OrderDetailScreen from '../screens/OrderDetailScreen/OrderDetailScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen/ChatDetailScreen';
import SettingScreen from '../screens/SettingScreen/SettingScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen/OrderHistoryScreen';
import EarningScreen from '../screens/EarningScreen/EarningScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='HomeTab' component={BototmTab} />
                <Stack.Screen name='OrderDetail' component={OrderDetailScreen} />
                <Stack.Screen name='ChatDetail' component={ChatDetailScreen} />
                <Stack.Screen name='Setting' component={SettingScreen} />
                <Stack.Screen name='OrderHistory' component={OrderHistoryScreen} />
                <Stack.Screen name='Earning' component={EarningScreen} />
            </Stack.Navigator>
        </NavigationContainer>   
    )
}