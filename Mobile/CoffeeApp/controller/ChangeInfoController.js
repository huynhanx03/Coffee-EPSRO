import { getDatabase, ref, update } from 'firebase/database'
import { getUserData } from './StorageController'
import { BASE_URL } from '../constants'
const { default: axios } = require('axios')

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
