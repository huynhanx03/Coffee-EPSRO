import { BASE_URL } from "../constants"
import axios from 'axios'

const handleRegisterAccount = async (username, email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/register`, {
            username: username,
            email: email,
            password: password
        })

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export { handleRegisterAccount }