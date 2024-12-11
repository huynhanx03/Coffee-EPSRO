import React, { createContext, useState } from 'react'
import useGetUserData from '../../hooks/useGetUserData';

const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
    const { userData } = useGetUserData();
    const [status, setStatus] = useState('offline');

    return (
        <UserDataContext.Provider value={{ userData, status, setStatus }}>
            {children}
        </UserDataContext.Provider>
    )
}

export { UserDataContext, UserDataProvider }
export const useUserData = () => {
    return React.useContext(UserDataContext)
}
