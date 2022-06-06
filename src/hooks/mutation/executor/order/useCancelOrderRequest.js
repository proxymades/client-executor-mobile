//core
import { useMutation, useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

//gql
import { CANCEL_ORDER_REQUEST } from '@gql_mutation/executor/order/CancelOrderRequest'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useCancelOrderRequest = (orderId) => {

    //global hooks
    const navigation = useNavigation()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [cancelOrderRequest] = useMutation(CANCEL_ORDER_REQUEST, {
        variables: {
            orderId: orderId
        },
        refetchQueries: ['ExecutorProfile', 'ExecutorFeed', 'ExecutorOrder', 'ExecutorOrderRequests'],
        onCompleted: () => {
            setTimeout(() => {
                isNotifedVar(locale.requestCanceled_notify)
                navigation.goBack()
            }, 2000)
        }
    })

    return { cancelOrderRequest }
}