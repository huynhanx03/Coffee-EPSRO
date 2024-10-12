import { useQuery } from '@tanstack/react-query'
import { getOrderSuccessByShipper } from '../controllers/OrderController'

const useGetOrderSuccessByShipper = (shipperId) => {
    const {
        data: OrderSuccess,
        isLoading,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['OrderSuccess', shipperId],
        queryFn: () => getOrderSuccessByShipper(shipperId),
        retry: 2,
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
    })

    return { orderSuccess: OrderSuccess?.data || [], isLoading, error, isFetching, refetch }
}

export default useGetOrderSuccessByShipper
