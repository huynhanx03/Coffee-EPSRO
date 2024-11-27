import React, { createContext } from "react";
import useGetUserData from "../../customHooks/useGetUserData";

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const { userData } = useGetUserData()
    return (
        <UserContext.Provider value = {{ userData }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
export const useUser= () => {
    return React.useContext(UserContext)
}