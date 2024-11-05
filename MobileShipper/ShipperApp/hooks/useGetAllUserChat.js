import { useQuery } from "@tanstack/react-query"
import { getAllUserChat } from "../controllers/ChatController"

const useGetAllUserChat = (shipperId) => {
    const {
        data: allUserChat,
        isLoading,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['allUserChat', shipperId],
        queryFn: () => getAllUserChat(shipperId),
        retry: 2,
        onError: (err) => {
            console.log(err.response ? err.response.data.message : err.message)
        },
    })
    
    return { allUserChat: allUserChat?.data || [], isLoading, error, isFetching, refetch }
}

export default useGetAllUserChat