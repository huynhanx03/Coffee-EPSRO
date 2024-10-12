import axios from 'axios'

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

const getOrders = async () => {
    try {
        const response = await axios.get(`${baseUrl}/order/all-orders`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const getOrderByShipperId = async (shipperId) => {
    try {
        const response = await axios.get(`${baseUrl}/order/shipper/${shipperId}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const getOrderSuccessByShipper = async (shipperId) => {
    try {
        const response = await axios.get(`${baseUrl}/order/shipper/order-success/${shipperId}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const takeUpOrder = async (shipperId, orderId) => {
    try {
        const response = await axios.put(`${baseUrl}/order/take-up-order`, { shipperId, orderId })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const getStatusOrder = async (orderId) => {
    try {
        const response = await axios.get(`${baseUrl}/order/status-order/${orderId}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const cancelOrder = async (orderId, shipperId) => {
    try {
        const response = await axios.put(`${baseUrl}/order/cancel-order`, { orderId, shipperId })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const setStatusOrder = async (orderId, status) => {
    try {
        const response = await axios.put(`${baseUrl}/order/set-status-order/${orderId}`, { status })
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export {
    takeUpOrder,
    getOrderByShipperId,
    getOrders,
    getStatusOrder,
    cancelOrder,
    setStatusOrder,
    getOrderSuccessByShipper,
}
