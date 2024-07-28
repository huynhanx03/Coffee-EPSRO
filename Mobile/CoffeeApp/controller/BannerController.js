import { BASE_URL } from '../constants'
import axios from 'axios'

const getBanner = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/banner/banners`)
        return response.data.data
    } catch (error) {
        return error.response.data
    }
}

export { getBanner }
