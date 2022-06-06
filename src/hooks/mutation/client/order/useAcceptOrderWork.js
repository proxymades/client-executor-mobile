//core
import { useApolloClient, useMutation, useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import cuid from 'cuid'

//gql
import { ACCEPT_ORDER_WORK } from '@gql_mutation/client/order/AcceptOrderWork'
import { WRITE_FEEDBACK_EXECUTOR } from '@gql_mutation/client/order/WriteFeedbackExecutor'
import { CLIENT_ACTIVITY } from '@gql_query/client/activity/ClientActivity'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useAcceptOrderWork = (orderId, requestId, formState) => {

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
    const [acceptOrderWork] = useMutation(ACCEPT_ORDER_WORK, {
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
            toUser: formState.executorPhone,
            orderId: orderId,
        },
        refetchQueries: activityQuery === null ? ['ClientOrder', 'ClientWorkOrders', 'ClientReadyOrders'] : false,
        onCompleted: () => {
            setTimeout(() => {
                isNotifedVar(locale.workAccepted_notify)
                navigation.pop(2)
            }, 2000)
        }
    })

    return { acceptOrderWork }
}