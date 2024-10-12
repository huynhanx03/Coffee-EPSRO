import { useQuery } from '@tanstack/react-query'
import { getOrders } from '../controllers/OrderController'

const useGetOrders = () => {
    const {
        data: orders,
        isLoading,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
        retry: 2,
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
    })

    return { orders: orders?.data || [], isLoading, error, isFetching, refetch }
}

export default useGetOrders