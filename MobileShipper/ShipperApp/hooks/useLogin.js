import { useMutation } from "@tanstack/react-query"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { login } from "../controllers/UserController"

const useLogin = () => {
    return useMutation({
        mutationFn: ({username, password}) => login(username, password),
    })
}

export default useLogin