//core
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_WORK_ORDERS } from '@gql_query/executor/order/ExecutorWorkOrders'

export const useExecutorWorkOrders = () => {

    //queries
    const { data, loading, refetch } = useQuery(EXECUTOR_WORK_ORDERS, {
        fetchPolicy: 'network-only',
    })

    return {
        executorWorkOrdersLoading: loading,
        executorWorkOrdersData: data?.executorWorkOrders,
        executorWorkOrdersRefetch: refetch,
    }
}