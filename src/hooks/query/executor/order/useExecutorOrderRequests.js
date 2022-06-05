//core
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_ORDER_REQUESTS } from '@gql_query/executor/order/ExecutorOrderRequests'

export const useExecutorOrderRequests = (phone) => {

    //queries
    const { data, loading, refetch } = useQuery(EXECUTOR_ORDER_REQUESTS, {
        fetchPolicy: 'network-only',
        variables: {
            phone: phone,
        }
    })

    return {
        executorOrderRequestsLoading: loading,
        executorOrderRequestsData: data?.executorOrderRequests,
        executorOrderRequestsRefetch: refetch,
    }
}