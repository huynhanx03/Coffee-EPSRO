import axios from "axios"

const baseUrl = process.env.EXPO_PUBLIC_BASE_URL

const setStatusShipper = async (shipperId, status) => {
    try {
        const response = await axios.put(`${baseUrl}/user/shipper/status`, { shipperId, status });
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export {
    setStatusShipper
}