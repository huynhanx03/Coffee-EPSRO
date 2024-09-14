import AsyncStorage from "@react-native-async-storage/async-storage"

/**
 * @notice Store user data in AsyncStorage
 * @param value The data of the user
 */
const storeData = async (name, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(name, jsonValue)
    } catch (error) {
        console.log(error)
    }
}

/**
 * @notice Get user data from AsyncStorage
 * @returns The user data that is logining
 */
const getUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
        console.log(error)
        return error
    }
}

const getToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('token')
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
        console.log(error)
        return error
    }
}

const removeUserData = async () => {
    try {
        await AsyncStorage.removeItem('user')
    } catch (error) {
        console.log(error)
    }
}

const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('token')
    } catch (error) {
        console.log(error)
    }
}

export { getUserData, storeData, removeUserData, getToken, removeToken }