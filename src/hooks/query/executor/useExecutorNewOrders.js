//core
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_NEW_ORDERS } from '@gql_query/executor/ExecutorNewOrders'

export const useExecutorNewOrders = (city, category) => {

    //queries
    const { data, loading } = useQuery(EXECUTOR_NEW_ORDERS, {
        fetchPolicy: 'network-only',
        variables: {
            city: city,
            category: category,
        }
    })

    return {
        executorNewOrdersLoading: loading,
        executorNewOrdersData: data?.executorNewOrders
    }
}