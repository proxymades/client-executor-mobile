//core
import { useQuery } from '@apollo/client'

//gql
import { GET_ORDER } from '@gql_query/order/GetOrder'

export const useOrder = (id) => {

    //queries
    const { data, loading } = useQuery(GET_ORDER, {
        fetchPolicy: 'network-only',
        variables: {
            id: id
        }
    })

    return {
        orderLoading: loading,
        orderData: data?.getOrder
    }
}