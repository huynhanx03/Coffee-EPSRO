import { useQuery } from "@tanstack/react-query"
import { getAllUserChat } from "../controller/ChatController"

const useGetAllUserChat = (userId) => {
    const {
        data: allUserChat,
        isLoading,
        error,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ['allUserChat', userId],
        queryFn: () => getAllUserChat(userId),
        retry: 2,
        onError: (err) => {
            console.log(err.response ? err.response.data.message : err.message)
        },
    })
    
    return { allUserChat: allUserChat?.data || [], isLoading, error, isFetching, refetch }
}

export default useGetAllUserChat