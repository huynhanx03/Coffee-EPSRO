import { child, get, getDatabase, ref, set } from "firebase/database"
import { getUserData } from "./StorageController"
import axios from 'axios'
import { BASE_URL } from "../constants"
import { getAuthHeaders } from "./TokenController"

/**
 * @notice Set review for product
 * @param rating The rating that cus give to the product
 * @param review The review that cus give to the product
 */
const setReview = async (productId, rating, review) => {
    try {
        const userData = await getUserData()
        const headers = await getAuthHeaders()
        const response = await axios.post(`${BASE_URL}/review/${userData.MaNguoiDung}/${productId}`, {
            rating: rating,
            content: review
        }, {headers})
        if (response.data.success) {
            return true
        }
        return false
    } catch (error) {
        console.log(error.response.data)
        return false
    }
}

/**
 * @notice Get review of a product
 * @param productId The id of the product that we want to get review
 */
const getReview = async (productId) => {
    try {
        const response = await axios.get(`${BASE_URL}/review/${productId}`)
        const reviews = response.data.data

        if (reviews === null) {
            return []
        }

        return Object.values(reviews)
    } catch (error) {
        console.log(error)
        return error
    }
}

export { setReview, getReview }