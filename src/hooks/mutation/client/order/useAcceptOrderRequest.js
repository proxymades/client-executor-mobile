//core
import { useMutation, useReactiveVar } from '@apollo/client'

//gql
import { ACCEPT_ORDER_REQUEST } from '@gql_mutation/client/order/AcceptOrderRequest'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useAcceptOrderRequest = (orderId, previousRequestId) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [accept] = useMutation(ACCEPT_ORDER_REQUEST, {
        refetchQueries: ['ClientOrderRequests', 'ClientOrdersRequests'],
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