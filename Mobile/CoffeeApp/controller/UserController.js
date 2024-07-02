import axios from "axios"
import { child, get, getDatabase, ref } from "firebase/database"
import { BASE_URL } from "../constants"

/**
 * @notice Get user by id
 * @param userId The id of the user
 * @returns user object
 */
const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`)
        return response.data.data
    } catch (error) {
        return error.response.data
    }
}

const getUserRankById = async (userId) => {
    const dbRef = ref(getDatabase())

    try {
        const userRankSnapshot = await get(child(dbRef, `KhachHang/${userId}`))
        const userRank = userRankSnapshot.val()

        return userRank
    } catch (error) {
        console.log(error)
        return error
    }
}

export { getUserById, getUserRankById }