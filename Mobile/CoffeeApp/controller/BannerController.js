import { BASE_URL } from '../constants'
const { default: axios } = require('axios')

const getBanner = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/banner/banners`)
        return response.data.data
    } catch (error) {
        return error.response.data
    }
}

export { getBanner }
