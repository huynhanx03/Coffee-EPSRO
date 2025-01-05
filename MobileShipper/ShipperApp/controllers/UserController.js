import axios from 'axios'
import { getAuthHeaders } from './TokenController'
import AsyncStorage from "@react-native-async-storage/async-storage"

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

const login = async (username, password) => {
    try {
        const response = await axios.post(`${baseUrl}/user/shipper/login`, { username, password })
        await AsyncStorage.setItem('token', response.data.token)
        await AsyncStorage.setItem('user', JSON.stringify(response.data.data))
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const verifyToken = async () => {
    try {
        const header = await getAuthHeaders()
        const response = await axios.get(`${baseUrl}/user/verify-token`, { headers: header })
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error(error.response.data.message)
    }
}

const setStatusShipper = async (shipperId, status) => {
    try {
        const response = await axios.put(`${baseUrl}/user/shipper/status`, { shipperId, status })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const getProfitByShipper = async (shipperId) => {
    try {
        const response = await axios.get(`${baseUrl}/user/profit/${shipperId}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const getCusData = async (userId) => {
    try {
        const headers = await getAuthHeaders()
        const response = await axios.get(`${baseUrl}/user/user/${userId}`, { headers })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { login, setStatusShipper, getProfitByShipper, verifyToken, getCusData }
