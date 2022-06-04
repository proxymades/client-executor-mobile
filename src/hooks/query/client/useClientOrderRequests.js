//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_ORDER_REQUESTS } from '@gql_query/client/ClientOrderRequests'

export const useClientOrderRequests = () => {

    //queries
    const { loading, data, refetch } = useQuery(CLIENT_ORDER_REQUESTS, {
        fetchPolicy: 'network-only',
    })

    return {
        clientOrderRequestsLoading: loading,
        clientOrderRequestsData: data?.clientOrderRequests,
        clientOrderRequestsRefetch: refetch,
    }
}