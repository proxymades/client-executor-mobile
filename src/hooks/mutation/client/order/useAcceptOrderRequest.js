//core
import { useApolloClient, useMutation, useReactiveVar } from '@apollo/client'

//gql
import { ACCEPT_ORDER_REQUEST } from '@gql_mutation/client/order/AcceptOrderRequest'
import { CLIENT_ACTIVITY } from '@gql_query/client/activity/ClientActivity'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useAcceptOrderRequest = (orderId, previousRequestId) => {

    //global hooks
    const client = useApolloClient()

    //cache
    const activityQuery = client.readQuery({
        query: CLIENT_ACTIVITY
    })

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [accept] = useMutation(ACCEPT_ORDER_REQUEST, {
        refetchQueries:
            activityQuery !== null ?
                ['ClientOrderRequests', 'ClientActivity'] :
                activityQuery === null ? ['ClientOrderRequests', 'ClientNewOrders', 'ClientWorkOrders', 'ClientOrder'] :
                    false,
        onCompleted: () => {
            isNotifedVar(locale.requestAccepted_notify)
        }
    })

    //handles
    const acceptOrderRequest = (requestId) => {
        accept({
            variables: {
                requestId: requestId,
                previousRequestId: previousRequestId,
                orderId: orderId,
            },
        })
    }

    return { acceptOrderRequest }
}