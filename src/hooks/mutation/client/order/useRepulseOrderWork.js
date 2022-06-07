//core
import { useApolloClient, useMutation, useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import cuid from 'cuid'

//gql
import { WRITE_FEEDBACK_EXECUTOR } from '@gql_mutation/client/order/WriteFeedbackExecutor'
import { CLIENT_ACTIVITY } from '@gql_query/client/activity/ClientActivity'
import { REPULSE_ORDER_WORK } from '@gql_mutation/client/order/RepulseOrderWork'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useRepulseOrderWork = (orderId, requestId, formState) => {

    //global hooks
    const navigation = useNavigation()
    const client = useApolloClient()

    //cache
    const activityQuery = client.readQuery({
        query: CLIENT_ACTIVITY
    })

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [repulseOrderWork] = useMutation(REPULSE_ORDER_WORK, {
        variables: {
            orderId: orderId,
            requestId: requestId,
        },
        onCompleted: () => {
            writeFeedback()
        }
    })

    const [writeFeedback] = useMutation(WRITE_FEEDBACK_EXECUTOR, {
        variables: {
            id: cuid(),
            rating: formState.rating,
            message: formState.message,
            toUser: formState.phone,
            orderId: orderId,
        },
        refetchQueries: activityQuery === null ? ['ClientOrder', 'ClientWorkOrders', 'ClientNewOrders', 'ClientOrderRequests'] : false,
        onCompleted: (data) => {
            if (data.feedbackExecutor) {
                setTimeout(() => {
                    isNotifedVar(locale.workNotAccepted_notify)
                    navigation.pop(2)
                }, 2000)
            } else if (!data.feedbackExecutor) {
                setTimeout(() => {
                    isNotifedVar(locale.feedbackExist_notify)
                    navigation.pop(2)
                }, 2000)
            }
        },
    })

    return { repulseOrderWork }
}