import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sendMessage } from "../controller/ChatController"

const useSendMessage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({shipperId, userId, message}) => sendMessage(shipperId, userId, message),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: () => {
            console.log('Send message successfully')
            queryClient.invalidateQueries('allUserChat')
        }
    })
}

export default useSendMessage