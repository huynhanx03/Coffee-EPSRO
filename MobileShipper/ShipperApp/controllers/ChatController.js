import axios from 'axios'

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

const getAllUserChat = async (shipperId) => {
    try {
        const response = await axios.get(`${baseUrl}/chat/all-user-chat/`, {
            params: { shipperId }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const makeChat = async (employee, user) => {
    try {
        const response = await axios.post(`${baseUrl}/chat/make-chat`, { employee, user })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const sendMessage = async (shipperId, userId, message) => {
    try {
        const response = await axios.post(`${baseUrl}/chat/send-message`, { shipperId, userId, message })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const getAllChat = async (shipperId, userId) => {
    try {
        const response = await axios.get(`${baseUrl}/chat/all-chat`, {
            params: { shipperId, userId }
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const setSeen = async (shipperId, userId) => {
    try {
        const response = await axios.put(`${baseUrl}/chat/seen`, { shipperId, userId })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { makeChat, getAllUserChat, sendMessage, getAllChat, setSeen }