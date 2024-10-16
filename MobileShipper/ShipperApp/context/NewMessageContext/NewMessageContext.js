import React, { createContext, useState } from "react";

const NewMessageContext = createContext()

const NewMessageProvider = ({ children }) => {
    const [newMessage, setNewMessage] = useState(0)

    return (
        <NewMessageContext.Provider value={{ newMessage, setNewMessage }}>
            {children}
        </NewMessageContext.Provider>
    )
}

export { NewMessageContext, NewMessageProvider }
export const useNewMessage = () => {
    return React.useContext(NewMessageContext)
}