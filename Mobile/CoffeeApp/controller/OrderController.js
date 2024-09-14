import { child, get, getDatabase, orderByChild, query, ref, set, update, equalTo } from "firebase/database";
import { getUserData } from "./StorageController";
import axios from 'axios';
import { BASE_URL } from "../constants";
import { getAuthHeaders } from "./TokenController";

/**
 * @notice Save order to database
 */
const saveOrder = async (products, total, transFee, addressData) => {
    try {
        const userData = await getUserData();
        const headers = await getAuthHeaders();
        const data = {products, total, transFee, addressData};
        const response = await axios.post(`${BASE_URL}/order/${userData.MaNguoiDung}`, data, {headers})
        return response.data
    } catch (error) {
        throw new Error("Lỗi khi tạo đơn hàng!")
    }
};

/**
 * @notive Get the order of the user
 * @returns The order of the user
 */
const getOrder = async () => {
    try {
        const userData = await getUserData();
        const response = await axios.get(`${BASE_URL}/order/${userData.MaNguoiDung}`)
        return response.data
    } catch (error) {
        console.log(error);
        return error;
    }
}

/**
 * @notice Set the status of the order
 * @param orderId The id of the order
 */
const setStatusOrder = async (orderId) => {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.put(`${BASE_URL}/order/${orderId}`, { headers })
        return response.data
    } catch (error) {
        console.log(error);
        return error;
    }
}

export { saveOrder, getOrder, setStatusOrder };
