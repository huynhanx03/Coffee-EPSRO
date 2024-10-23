import { useMutation, useQueryClient } from "@tanstack/react-query"
import { setSeen } from "../controller/ChatController"

const useSeen = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({shipperId, userId}) => setSeen(shipperId, userId),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('allUserChat')
        }
    })
}

export default useSeen