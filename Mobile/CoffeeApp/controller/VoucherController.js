import { child, equalTo, get, getDatabase, orderByChild, query, ref, update } from "firebase/database";
import { getUserData } from "./StorageController";
import { BASE_URL } from "../constants";
const { default: axios } = require("axios")


/**
 * @notice Get the vouchers list that user obtained
 * @dev Get all the voucher then filter the voucher by user id
 * @returns The vouchers list that user obtained
 */
const getVoucher = async () => {
    try {
        const userData = await getUserData();
        const response = await axios.get(`${BASE_URL}/voucher/${userData.MaNguoiDung}`);

        return response.data;
    } catch (error) {
        return response.error.data;
    }
};

/**
 * @notice Update the voucher status
 * @param voucherId The id of the voucher
 */
const updateVoucherUsed = async (voucherId) => {
    try {
        const userData = await getUserData();
        const response = await axios.post(`${BASE_URL}/voucher/update/${voucherId}/${userData.MaNguoiDung}`);

        return response.data;
    } catch (error) {
        return response.error.data;
    }
}

export { getVoucher, updateVoucherUsed };
