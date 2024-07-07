import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { getAddress } from '../controller/AddressController';


const getDefaultAddress = () => {
    const [addressData, setAddressData] = useState(null)

    const handleGetAddresses = async () => {
        try {
            const addresses = await getAddress();
            if (addresses.data) {
                let addressDefault = null;
                for (const address in addresses.data) {
                    if (addresses.data[address].Default) {
                        addressDefault = addresses.data[address];
                        break;
                    }
                }
                if (addressDefault) {
                    setAddressData(addressDefault);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(
        useCallback(() => {
            handleGetAddresses();
        }, [])
    )

    useEffect(() => {
        handleGetAddresses();
    }, [])

    return addressData
}

export default getDefaultAddress