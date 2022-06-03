//core
import { useQuery } from '@apollo/client'

//gql
import { GET_EXECUTOR_ORDER } from '@gql_query/order/GetExecutorOrder'

export const useExecutorOrder = (id) => {

    //queries
    const { data, loading } = useQuery(GET_EXECUTOR_ORDER, {
        fetchPolicy: 'network-only',
        variables: {
            id: id
        }
    })

    return {
        orderLoading: loading,
        orderData: data?.getExecutorOrder,
    }
}