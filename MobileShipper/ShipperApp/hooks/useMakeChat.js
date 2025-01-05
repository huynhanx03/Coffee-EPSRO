import { makeChat } from "../controllers/ChatController"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useMakeChat = (shipperId) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({employee, user}) => makeChat(employee, user),
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
        onSuccess: () => {
            console.log('Make chat successfully')
            queryClient.invalidateQueries(['allUserChat', shipperId])
        },
    })
}

export { useMakeChat }