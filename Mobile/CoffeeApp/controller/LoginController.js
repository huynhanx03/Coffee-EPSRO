import { BASE_URL } from "../constants";
import { storeData } from "./StorageController";
import db from "../firebase";

const { default: axios } = require("axios");

const handleLogin = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/login`, {
            username: username,
            password: password
        })

        await storeData('user', response.data.data);
        await storeData('token', response.data.token);

        return response.data
    } catch (error) {
        return error
    }
}

export { handleLogin };