//core
import { useApolloClient, useMutation, useReactiveVar } from '@apollo/client'

//gql
import { REPULSE_ORDER_REQUEST } from '@gql_mutation/client/order/RepulseOrderRequest'
import { CLIENT_ACTIVITY } from '@gql_query/client/order/ClientActivity'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useRepulseOrderRequest = (orderId) => {

    //global hooks
    const client = useApolloClient()

    //cache
    const activityQuery = client.readQuery({
        query: CLIENT_ACTIVITY
    })

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [repulse] = useMutation(REPULSE_ORDER_REQUEST, {
        refetchQueries: ['ClientOrderRequests', activityQuery !== null && 'ClientActivity'],
        onCompleted: () => {
            isNotifedVar(locale.requestRepulsed_notify)
        }
    })

    //handles
    const repulseOrderRequest = (requestId) => {
        repulse({
            variables: {
                requestId: requestId,
                orderId: orderId,
            },
        })
    }

    return { repulseOrderRequest }
}