//core
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_ORDER } from '@gql_query/executor/order/ExecutorOrder'

export const useExecutorOrder = (id) => {

    //queries
    const { data, loading } = useQuery(EXECUTOR_ORDER, {
        fetchPolicy: 'network-only',
        variables: {
            id: id
        }
    })

    return {
        orderLoading: loading,
        orderData: data?.executorOrder,
    }
}