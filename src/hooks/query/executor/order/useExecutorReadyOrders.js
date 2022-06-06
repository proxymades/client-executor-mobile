//core
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_READY_ORDERS } from '@gql_query/executor/order/ExecutorReadyOrders'

export const useExecutorReadyOrders = () => {

    //queries
    const { data, loading, refetch } = useQuery(EXECUTOR_READY_ORDERS, {
        fetchPolicy: 'network-only',
    })

    return {
        executorReadyOrdersLoading: loading,
        executorReadyOrdersData: data?.executorReadyOrders,
        executorReadyOrdersRefetch: refetch,
    }
}