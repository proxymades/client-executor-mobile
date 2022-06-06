//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_ACTIVITY } from '@gql_query/client/order/ClientActivity'

export const useClientActivity = () => {

    //queries
    const { loading, data, refetch } = useQuery(CLIENT_ACTIVITY, {
        fetchPolicy: 'network-only',
    })

    return {
        clientActivityLoading: loading,
        clientActivityData: data?.clientActivity,
        clientActivityRefetch: refetch,
    }
}