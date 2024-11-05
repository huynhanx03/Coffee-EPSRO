import { useMutation } from "@tanstack/react-query"
import { sendMessage } from "../controllers/ChatController"

const useSendMessage = () => {
    return useMutation({
        mutationFn: ({shipperId, userId, message}) => sendMessage(shipperId, userId, message),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: () => {
            console.log('Send message successfully')
        }
    })
}

export default useSendMessage