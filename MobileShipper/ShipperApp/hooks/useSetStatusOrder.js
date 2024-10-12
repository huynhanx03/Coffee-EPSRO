import { useMutation, useQueryClient } from "@tanstack/react-query"
import { setStatusOrder } from "../controllers/OrderController"

const useSetStatusOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({orderId, status}) => setStatusOrder(orderId, status),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: () => {
            console.log('Set status order successfully')
            queryClient.invalidateQueries(['orders'])
        }
    })
}

export default useSetStatusOrder