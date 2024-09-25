import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, View } from "react-native";
import Header from "../components/header";
import ItemOrderList from "../components/itemOrderList";

const OrderInfoScreen = () => {
    return (
        <View className="flex-1">
            <StatusBar style="dark" />
            <Header title='Thông tin đơn hàng'/>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: 8}}>
                <ItemOrderList />
            </ScrollView>
        </View>
    );
};

export default OrderInfoScreen;
