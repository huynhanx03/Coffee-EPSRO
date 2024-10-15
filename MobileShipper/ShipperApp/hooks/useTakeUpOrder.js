import { useMutation, useQueryClient } from "@tanstack/react-query"
import { takeUpOrder } from "../controllers/OrderController"

const useTakeUpOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({shipperId, orderId}) => takeUpOrder(shipperId, orderId),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: () => {
            console.log('Take up order successfully')
            queryClient.invalidateQueries(['orders'])
        }
    })
}

export default useTakeUpOrder