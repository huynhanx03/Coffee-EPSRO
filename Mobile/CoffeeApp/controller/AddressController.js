import { BASE_URL } from "../constants";
import { getUserData } from "./StorageController";
import axios from 'axios'
import { getAuthHeaders } from "./TokenController";

/**
 * @notice Add a new address to the database
 * @param name name of the user who owns the address
 * @param phone of the user who owns the address
 * @param detail_address the detail address (street, ward, district, city)
 * @param location the longtitude and latitude of the address
 * @returns the result of the operation
 */
const addAddress = async (name, phone, detail_address, location) => {
    try {
        const headers = await getAuthHeaders()
        const userData = await getUserData();
        const response = await axios.post(`${BASE_URL}/address/${userData.MaNguoiDung}`, {
            name: name,
            phone: phone,
            detail_address: detail_address,
            location: location
        }, {headers})

        return response.data
    } catch (error) {
        return error.response.data
    }
};

/**
 * @notice Get the addresses of the user
 * @returns the addresses of the user
 */
const getAddress = async () => {
    try {
        const userData = await getUserData();
        const response = await axios.get(`${BASE_URL}/address/${userData.MaNguoiDung}`)
        return response.data
    } catch (error) {
        return error.response.data
    }
};

/**
 * @notice Set the default address of the user
 */
const setDefaultAddress = async (key) => {
    try {
        const userData = await getUserData();
        const headers = await getAuthHeaders();
        const response = await axios.put(`${BASE_URL}/address/${userData.MaNguoiDung}/${key}`, {headers})
        return response.data
    } catch (error) {
        return error.response.data
    }
};

export { addAddress, getAddress, setDefaultAddress };
