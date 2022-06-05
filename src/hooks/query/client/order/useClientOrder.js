//core
import { useQuery } from '@apollo/client'

//gql
import { GET_CLIENT_ORDER } from '@gql_query/client/order/GetClientOrder'

export const useClientOrder = (id) => {

    //queries
    const { data, loading } = useQuery(GET_CLIENT_ORDER, {
        fetchPolicy: 'network-only',
        variables: {
            id: id
        }
    })

    return {
        orderLoading: loading,
        orderData: data?.getClientOrder
    }
}