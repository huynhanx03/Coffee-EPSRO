import { BASE_URL } from '../constants'
import { getUserData } from './StorageController'
import axios from 'axios'
import { getAuthHeaders } from './TokenController'

/**
 * @notice Add a new item to cart
 * @dev If item is already presented in cart, increase the quantity of the item
 * @param item the item to be added to cart
 */
const setCart = async (item) => {
    try {
        const userData = await getUserData()
        const headers = await getAuthHeaders()
        const response = await axios.post(`${BASE_URL}/cart/${userData.MaNguoiDung}`, item, {headers})
        return response.data
    } catch (error) {
        return error.response.data
    }
}

/**
 * @notice Delete an item from cart
 * @param item the item to be deleted from cart
 * @returns
 */
const deleteItemCard = async (item) => {
    try {
        const userData = await getUserData()
        const headers = await getAuthHeaders()
        const response = await axios.delete(`${BASE_URL}/cart/${userData.MaNguoiDung}/${item.MaSanPham}`, {headers})
        return response.data
    } catch (error) {
        return error.response.data
    }
}

/**
 * @notice remove all items from cart
 */
const removeItemCart = async () => {
    try {
        const userData = await getUserData()
        const headers = await getAuthHeaders()
        const response = await axios.delete(`${BASE_URL}/cart/${userData.MaNguoiDung}`, {headers})
        return response.data
    } catch (error) {
        return error.response.data
    }
}

/**
 * @notice Get all items in cart from database
 */
const getCart = async () => {
    try {
        const userData = await getUserData()
        const response = await axios.get(`${BASE_URL}/cart/${userData.MaNguoiDung}`)
        return response.data
    } catch (err) {
        return err.response.data
    }
}

/**
 * @notice Update the cart with the latest price
 * @returns The cart that is updated the latest price
 */
const updateCartWithLastPrice = async () => {
    try {
        const userData = await getUserData()
        const headers = await getAuthHeaders()
        const response = await axios.put(`${BASE_URL}/cart/${userData.MaNguoiDung}`, {headers})
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export { setCart, getCart, deleteItemCard, removeItemCart, updateCartWithLastPrice }
