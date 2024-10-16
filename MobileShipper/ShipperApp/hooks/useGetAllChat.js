import { useQuery } from "@tanstack/react-query"
import { getAllChat } from "../controllers/ChatController"

const useGetAllChat = (shipperId, userId) => {
    const {
        data: allChat,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['allChat'],
        queryFn: () => getAllChat(shipperId, userId),
        retry: 2,
        onError: (err) => {
            console.error(err.response ? err.response.data.message : err.message)
        },
    })

    return { allChat: allChat?.data || [], error, isLoading }
}

export default useGetAllChat