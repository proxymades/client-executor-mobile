//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_ORDERS_REQUESTS } from '@gql_query/client/order/ClientOrdersRequests'

export const useClientOrdersRequests = () => {

    //queries
    const { loading, data, refetch } = useQuery(CLIENT_ORDERS_REQUESTS, {
        fetchPolicy: 'network-only',
    })

    return {
        clientOrdersRequestsLoading: loading,
        clientOrdersRequestsData: data?.clientOrdersRequests,
        clientOrdersRequestsRefetch: refetch,
    }
}