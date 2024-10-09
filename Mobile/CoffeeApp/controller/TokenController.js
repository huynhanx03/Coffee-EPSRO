import 'core-js/stable/atob'
import { jwtDecode } from 'jwt-decode'
import { getToken } from './StorageController'

const isExpiredToken = async (token) => {
    try {
        const decoded = jwtDecode(token)
        if (decoded.exp >= Date.now() / 1000) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
    }
}

const getAuthHeaders = async () => {
    const token = await getToken()
    return {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
}

export { isExpiredToken, getAuthHeaders }
