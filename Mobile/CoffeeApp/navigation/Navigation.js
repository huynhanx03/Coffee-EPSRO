import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LogInScreen from '../screens/LogInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotScreen from '../screens/ForgotScreen';
import VerifyScreen from '../screens/VerifyScreen';
import DetailItemScreen from '../screens/DetailItemScreen';
import BottomTab from './BottomTab';
import EditScreen from '../screens/EditScreen';
import ChangePassword from '../screens/ChangePassword';
import CartScreen from '../screens/CartScreen';
import AddressScreen from '../screens/AddressScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import MapScreen from '../screens/MapScreen';
import PreparePayScreen from '../screens/PreparePayScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import OrderInfoScreen from '../screens/OrderInfoScreen';
import ReviewScreen from '../screens/ReviewScreen';
import VoucherScreen from '../screens/VoucherScreen';
import ChangeInfoScreen from '../screens/ChangeInfoScreen';
import ChangePasswordForgotScreen from '../screens/ChangePasswordForgotScreen';
import ChatScreen from '../screens/ChatScreen';
import { UserProvider } from '../context/UserContext/UserContext';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        {[
          'Welcome',
          'Login',
          'Register',
          'Forgot',
          'Verify',
          'ChangePasswordForgot',
        ].map((screenName) => (
          <Stack.Screen key={screenName} name={screenName} component={getComponent(screenName)} />
        ))}
        
        {[
          'HomeTab',
          'Detail',
          'Edit',
          'ChangePassword',
          'Cart',
          'ChatDetail',
          'Address',
          'AddAddress',
          'Prepare',
          'OrderSuccess',
          'OrderInfo',
          'Voucher',
          'ChangeInfo',
          'Review',
          'MapView',
        ].map((screenName) => (
          <Stack.Screen key={screenName} name={screenName}>
            {(props) => (
              <UserProvider>
                {React.createElement(getComponent(screenName), props)}
              </UserProvider>
            )}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Hàm ánh xạ tên màn hình với component tương ứng
function getComponent(screenName) {
  const components = {
    Welcome: WelcomeScreen,
    Login: LogInScreen,
    Register: RegisterScreen,
    Forgot: ForgotScreen,
    Verify: VerifyScreen,
    ChangePasswordForgot: ChangePasswordForgotScreen,
    HomeTab: BottomTab,
    Detail: DetailItemScreen,
    Edit: EditScreen,
    ChangePassword: ChangePassword,
    Cart: CartScreen,
    ChatDetail: ChatScreen,
    Address: AddressScreen,
    AddAddress: AddAddressScreen,
    Prepare: PreparePayScreen,
    OrderSuccess: OrderSuccessScreen,
    OrderInfo: OrderInfoScreen,
    Voucher: VoucherScreen,
    ChangeInfo: ChangeInfoScreen,
    Review: ReviewScreen,
    MapView: MapScreen,
  };

  return components[screenName];
}
