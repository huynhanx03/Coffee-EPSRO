import React, { createContext, useState, useEffect, useMemo } from 'react';
import { SHIPPER_STATUS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGetUserData from '../../hooks/useGetUserData';

const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { userData, isLoading } = useGetUserData(isLoggedIn);
    const [status, setStatus] = useState(SHIPPER_STATUS.OFFLINE);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    const value = useMemo(() => ({
        userData,
        status,
        setStatus,
        isLoading,
        isLoggedIn,
        setIsLoggedIn
    }), [userData, status, isLoading, isLoggedIn]);

    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    );
};

export { UserDataContext, UserDataProvider };
export const useUserData = () => {
    return React.useContext(UserDataContext);
};
