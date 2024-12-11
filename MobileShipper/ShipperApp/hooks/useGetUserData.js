const { useQuery } = require("@tanstack/react-query")
import AsyncStorage from "@react-native-async-storage/async-storage"

const getUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('user')
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
        console.log(error)
        return error
    }
}

const useGetUserData = () => {
    const {
        data: userData,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['userData'],
        queryFn: () => getUserData(),
        retry: 2,
        enabled: true
    })

    return { userData, isLoading, isError }
}

export default useGetUserData