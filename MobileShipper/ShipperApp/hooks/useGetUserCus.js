import { useQuery } from "@tanstack/react-query"
import { getCusData } from "../controllers/UserController"

const useGetUserCus = (userId) => {
    const {
        data: cusData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['cusData', userId],
        queryFn: () => getCusData(userId),
        retry: 2,
        enabled: !!userId,
    })

    return { cusData: cusData?.data ?? {}, isLoading, isError, error }
}

export default useGetUserCus