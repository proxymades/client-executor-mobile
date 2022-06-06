//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_ORDER } from '@gql_query/client/order/ClientOrder'

export const useClientOrder = (id) => {

    //queries
    const { data, loading } = useQuery(CLIENT_ORDER, {
        fetchPolicy: 'network-only',
        variables: {
            id: id
        }
    })

    return {
        orderLoading: loading,
        orderData: data?.clientOrder
    }
}