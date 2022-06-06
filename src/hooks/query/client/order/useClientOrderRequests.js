//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_ORDER_REQUESTS } from '@gql_query/client/order/ClientOrderRequests'

export const useClientOrderRequests = (orderId) => {

    //queries
    const { loading, data, refetch } = useQuery(CLIENT_ORDER_REQUESTS, {
        fetchPolicy: 'network-only',
        variables: {
            orderId: orderId
        }
    })

    return {
        clientOrderRequestsLoading: loading,
        clientOrderRequestsData: data?.clientOrderRequests,
        clientOrderRequestsRefetch: refetch,
        acceptedRequestId: data?.clientOrderRequests.filter(el => el.accepted).map(el => el.id)[0],
        isFinished: data?.clientOrderRequests.find(el => el.finished)
    }
}