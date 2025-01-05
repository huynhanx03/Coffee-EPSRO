import { useMutation } from "@tanstack/react-query"
import { makeChat } from "../controller/ChatController"

const useMakeChat = () => {
    return useMutation({
        mutationFn: ({employee, user}) => makeChat(employee, user),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: () => {
            console.log('Make chat successfully')
        }
    })
}

export default useMakeChat