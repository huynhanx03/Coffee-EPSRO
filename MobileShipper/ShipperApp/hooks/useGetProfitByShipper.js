import { useQuery } from "@tanstack/react-query"
import { getProfitByShipper } from "../controllers/UserController"
import { useEffect, useCallback } from "react"
import { AppState } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

const useGetProfitByShipper = (shipperId) => {
    const {
        data: profit,
        isLoading,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['profit', shipperId],
        queryFn: () => getProfitByShipper(shipperId),
        retry: 2,
        refetchOnWindowFocus: true,
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
    })

    useFocusEffect(
        useCallback(() => {
            refetch()
        }, [refetch])
    )

    return { profit: profit?.data || [], isLoading, error, isFetching, refetch }
}

export default useGetProfitByShipper