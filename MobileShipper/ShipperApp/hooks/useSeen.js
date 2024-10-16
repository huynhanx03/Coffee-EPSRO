import { useMutation, useQueryClient } from "@tanstack/react-query"
import { setSeen } from "../controllers/ChatController"

const useSeen = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({shipperId, userId}) => setSeen(shipperId, userId),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: () => {
            console.log('Seen message successfully')
            queryClient.invalidateQueries('allChat')
        }
    })
}

export default useSeen