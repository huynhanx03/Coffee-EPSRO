import { useQuery } from "@tanstack/react-query"
import { getRoutes } from "../controllers/RouteController"

const useGetRoute = (startCoords, endCoords) => {
    const {
        data: routesData,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['route', startCoords, endCoords],
        queryFn: () => getRoutes(startCoords, endCoords),
        retry: 2,
        enabled: !!startCoords && !!endCoords,
    })

    return { routesData, isLoading, isError }
}

export default useGetRoute