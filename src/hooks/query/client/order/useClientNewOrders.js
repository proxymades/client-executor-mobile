//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_NEW_ORDERS } from '@gql_query/client/order/ClientNewOrders'

export const useClientNewOrders = (phone) => {

    //queries
    const { data, loading } = useQuery(CLIENT_NEW_ORDERS, {
        fetchPolicy: 'network-only',
        variables: {
            phone: phone
        }
    })

    return {
        clientNewOrdersLoading: loading,
        clientNewOrdersData: data?.clientNewOrders
    }
}