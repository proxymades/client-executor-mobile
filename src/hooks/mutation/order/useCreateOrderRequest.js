//core
import { useMutation, useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import cuid from 'cuid'

//gql
import { CREATE_ORDER_REQUEST } from '@gql_mutation/order/CreateOrderRequest'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useCreateOrderRequest = (orderId, offer) => {

    //global hooks
    const navigation = useNavigation()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [createOrderRequest] = useMutation(CREATE_ORDER_REQUEST, {
        variables: {
            id: cuid(),
            orderId: orderId,
            offer: offer,
        },
        refetchQueries: ['GetExecutorOrder', 'ExecutorProfile', 'ExecutorFeed'],
        onCompleted: (data) => {
            if (data.createOrderRequest === 'ok') {
                setTimeout(() => {
                    isNotifedVar(locale.requestSended_notify)
                    navigation.goBack()
                    navigation.jumpTo('ExecutorProfileScreen')
                }, 2000)
            } else if (data.createOrderRequest === 'worked') {
                setTimeout(() => {
                    isNotifedVar(locale.orderUAccepted_notify)
                    navigation.goBack()
                }, 2000)
            }
            else {
                setTimeout(() => {
                    isNotifedVar(locale.requestSendedError_notify)
                    navigation.goBack()
                }, 2000)
            }
        }
    })

    return { createOrderRequest }
}