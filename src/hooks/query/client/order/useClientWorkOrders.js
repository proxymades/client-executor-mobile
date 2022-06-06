//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_WORK_ORDERS } from '@gql_query/client/order/ClientWorkOrders'

export const useClientWorkOrders = () => {

    //queries
    const { data, loading } = useQuery(CLIENT_WORK_ORDERS, {
        fetchPolicy: 'network-only',
    })

    return {
        clientWorkOrdersLoading: loading,
        clientWorkOrdersData: data?.clientWorkOrders
    }
}