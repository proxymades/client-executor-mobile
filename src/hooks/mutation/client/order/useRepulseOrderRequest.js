//core
import { useMutation, useReactiveVar } from '@apollo/client'

//gql
import { REPULSE_ORDER_REQUEST } from '@gql_mutation/client/order/RepulseOrderRequest'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useRepulseOrderRequest = (orderId) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [repulse] = useMutation(REPULSE_ORDER_REQUEST, {
        refetchQueries: ['ClientOrderRequests', 'ClientOrdersRequests'],
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