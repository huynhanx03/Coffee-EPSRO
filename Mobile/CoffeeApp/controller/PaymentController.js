import axios from 'axios'
import { BASE_URL } from '../constants'
import { getAuthHeaders } from './TokenController'

const paymentByMomo = async (total) => {
    try {
        const headers = await getAuthHeaders()
        const response = await axios.post(`${BASE_URL}/payment`, {
            total
        }, {headers})
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const getStatusTransaction = async (orderId) => {
    try {   
        const response = await axios.post(`${BASE_URL}/payment/status/${orderId}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export {
    paymentByMomo,
    getStatusTransaction
}