import { useMutation } from "@tanstack/react-query"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { login } from "../controllers/UserController"

const useLogin = () => {
    return useMutation({
        mutationFn: ({username, password}) => login(username, password),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: async (data) => {
            console.log('Login successfully')
            try {
                await AsyncStorage.setItem('token', data.token)
                await AsyncStorage.setItem('user', JSON.stringify(data.data))
            } catch (err) {
                console.log(err)
            }
        }
    })
}

export default useLogin