//core
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_ORDER_REQUESTS } from '@gql_query/executor/order/ExecutorOrderRequests'

export const useExecutorOrderRequests = () => {

    //queries
    const { data, loading, refetch } = useQuery(EXECUTOR_ORDER_REQUESTS, {
        fetchPolicy: 'network-only',
    })

    return {
        executorOrderRequestsLoading: loading,
        executorOrderRequestsData: data?.executorOrderRequests,
        executorOrderRequestsRefetch: refetch,
    }
}