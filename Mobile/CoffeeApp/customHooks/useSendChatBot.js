import { useMutation } from "@tanstack/react-query"
import { sendMessageChatBot } from "../controller/ChatController"

const useSendChatBot = () => {
    return useMutation({
        mutationFn: ({userId, message}) => sendMessageChatBot(userId, message),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: () => {
            console.log('Send message successfully')
        }
    })
}

export default useSendChatBot