import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Header from "../components/header";
import ItemVoucherList from "../components/itemVoucherList";
import { getVoucher } from "../controller/VoucherController";

const VoucherScreen = () => {
    const [voucherList, setVoucherList] = useState([])
    const handleGetVoucher = async () => {
        try {
            const vouchers = await getVoucher();
            setVoucherList(vouchers.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetVoucher()
    }, [])
    return (
        <View className='flex-1'>
            <Header title={'Phiếu giảm giá'}/>
            
            <ScrollView className='flex-1'>
                {voucherList && <ItemVoucherList voucherList={voucherList}/>}
            </ScrollView>
        </View>
    );
};

export default VoucherScreen;
