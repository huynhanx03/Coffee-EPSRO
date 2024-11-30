import { BASE_URL } from "../constants"
import axios from 'axios'

const { EXPO_PUBLIC_PHONE_NUMBER, EXPO_PUBLIC_ADMIN_ID } = process.env

const handleRegisterAccount = async (name, username, phone, email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/register`, {
            name: name,
            username: username,
            phone: phone,
            email: email,
            password: password
        })

        await axios.post(`${BASE_URL}/chat/make-chat`, { 
            employee: {
                MaNhanVien: EXPO_PUBLIC_ADMIN_ID,
                SoDienThoai: EXPO_PUBLIC_PHONE_NUMBER,
            },
            user: response.data.data,
        })

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export { handleRegisterAccount }