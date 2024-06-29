import { storeData } from "./StorageController";

const { default: axios } = require("axios");

const handleLogin = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:3000/users/login', {
            username: username,
            password: password
        })

        await storeData(response.data.data);

        return response.data
    } catch (error) {
        return error.response.data
    }
}

export { handleLogin };