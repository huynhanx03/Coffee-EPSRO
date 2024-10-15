import { useQuery } from '@tanstack/react-query';
import { getStatusOrder } from '../controllers/OrderController';

const useGetStatusOrder = (orderId) => {
    const {
        data: status,
        isLoading: loading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['statusOrder', orderId],
        queryFn: () => getStatusOrder(orderId),
        retry: 2,
        onError: (err) => {
            console.log(err.response ? err.response.data.message : err.message);
        },
    });

    return { status: status?.data || null, loading, error, refetch };
};

export default useGetStatusOrder;
