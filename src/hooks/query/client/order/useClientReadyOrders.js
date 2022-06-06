//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_READY_ORDERS } from '@gql_query/client/order/ClientReadyOrders'

export const useClientReadyOrders = () => {

    //queries
    const { data, loading } = useQuery(CLIENT_READY_ORDERS, {
        fetchPolicy: 'network-only',
    })

    return {
        clientReadyOrdersLoading: loading,
        clientReadyOrdersData: data?.clientReadyOrders
    }
}