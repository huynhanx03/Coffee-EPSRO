import { getUserData } from './StorageController'
import { BASE_URL } from '../constants'
import axios from 'axios'

const updateInfo = async (content, type) => {
    try {
        const userData = await getUserData()
        const response = await axios.put(`${BASE_URL}/user/update/${userData.MaNguoiDung}`, {
            content,
            type
        })

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export { updateInfo }
