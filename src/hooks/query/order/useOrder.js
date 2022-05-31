//core
import { useQuery } from '@apollo/client'

//gql
import { ORDER } from '@gql_query/order/Order'

export const useOrder = (id) => {

    //queries
    const { data, loading } = useQuery(ORDER, {
        fetchPolicy: 'network-only',
        variables: {
            id: id
        }
    })

    return {
        orderLoading: loading,
        orderData: data?.order
    }
}