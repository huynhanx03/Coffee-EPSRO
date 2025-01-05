import axios from 'axios'
import { BASE_URL } from '../constants'

const baseUrl = BASE_URL
const chatbotUrl = process.env.EXPO_PUBLIC_CHATBOT_URL

const getAllUserChat = async (userId) => {
    try {
        const response = await axios.get(`${baseUrl}/chat/all-user-chat`, {
            params: { userId: userId },
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const makeChat = async (employee, user) => {
    try {
        const response = await axios.post(`${baseUrl}/chat/make-chat`, {employee, user})
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const sendMessage = async (shipperId, userId, message) => {
    try {
        const response = await axios.post(`${baseUrl}/chat/send-message/${userId}`, {
            shipperId: shipperId,
            userId: userId,
            message: message,
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const setSeen = async (shipperId, userId) => {
    try {
        const response = await axios.put(`${baseUrl}/chat/seen/${userId}`, {
            shipperId: shipperId,
            userId: userId,
        })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const sendMessageChatBot = async (userId, message) => {
    console.log('sendMessageChatBot', userId, message)
    try {
        const response = await axios.post(`${chatbotUrl}/chat`, {
            user_id: userId,
            question: message,
        })
        
        console.log(response.data.response)

        await axios.post(`${baseUrl}/chat/send-message`, { shipperId: 'chatbot', userId, message: response.data.response })

        return response.data
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.message)
    }
}

export { getAllUserChat, sendMessage, setSeen, sendMessageChatBot, makeChat }
