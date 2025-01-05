import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const useGetUserData = (isLoggedIn) => {
    const {
        data: userData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['userData'],
        queryFn: getUserData,
        enabled: isLoggedIn,
        retry: 2,
    });

    return { userData, isLoading, isError };
};

export default useGetUserData;
