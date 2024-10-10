import { ref, update } from 'firebase/database'
import { getUserData } from './StorageController'
import axios from 'axios'
import { BASE_URL } from '../constants'
import { getAuthHeaders } from './TokenController'

/**
 * @notice Check if the confirm password is similar to the new password
 * @param newPassword Get the new password
 * @param confirmPassword Get the confirm password
 * @returns The result of the operation
 */
const checkConfirmPassword = (newPassword, confirmPassword) => {
    return newPassword === confirmPassword
}

/**
 * @notice Change password
 * @param oldPassword old password
 * @param newPassword new password
 * @param confirmPassword confirm password
 * @returns The result of the operation
 */
const changePassword = async (oldPassword, newPassword, confirmPassword, isForgot) => {
    const userData = await getUserData()

    if (checkConfirmPassword(newPassword, confirmPassword) === false) return [false, 'Mật khẩu xác nhận không đúng']

    const headers = await getAuthHeaders()

    const data = {
        oldPassword,
        newPassword,
        isForgot,
    }

    try {
        const response = await axios.put(`${BASE_URL}/user/update/password/${userData.MaNguoiDung}`, data, {headers})

        if (response.data.success === false) {
            return [false, response.data.message]
        } else {
            return [true, response.data.message]
        }
    } catch (error) {
        return error.response.data
    }
}

export { changePassword }
