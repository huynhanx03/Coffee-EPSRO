import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cancelOrder } from "../controllers/OrderController"

const useCancelOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({orderId, shipperId}) => cancelOrder(orderId, shipperId),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: () => {
            console.log('Cancel order successfully')
            queryClient.invalidateQueries(['orders'])
        }
    })
}

export default useCancelOrder