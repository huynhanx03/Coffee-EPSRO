import { getUserData } from './StorageController'
import { BASE_URL } from '../constants'
import axios from 'axios'
import { getAuthHeaders } from './TokenController'

const updateInfo = async (content, type) => {
    try {
        const userData = await getUserData()
        const headers = await getAuthHeaders()
        const response = await axios.put(`${BASE_URL}/user/update/${userData.MaNguoiDung}`, {
            content,
            type
        }, {headers})

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export { updateInfo }
