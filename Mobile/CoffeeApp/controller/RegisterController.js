import { BASE_URL } from "../constants"
import axios from 'axios'

const handleRegisterAccount = async (name, username, email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/register`, {
            name: name,
            username: username,
            email: email,
            password: password
        })

        await axios.post(`${BASE_URL}/chat/make-chat`, { 
            employee: {
                MaNhanVien: 'ND0001'
            },
            user: response.data.data,
        })

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export { handleRegisterAccount }