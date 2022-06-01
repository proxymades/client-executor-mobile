//core
import { useMutation, useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

//gql
import { DELETE_ORDER } from '@gql_mutation/order/DeleteOrder'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useDeleteOrder = (orderId) => {

    //global hooks
    const navigation = useNavigation()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [deleteOrder] = useMutation(DELETE_ORDER, {
        variables: {
            id: orderId
        },
        refetchQueries: ['ClientProfile', 'ClientNewOrders'],
        onCompleted: (data) => {
            setTimeout(() => {
                isNotifedVar(locale.orderDeleted_notify)
                navigation.goBack()
            }, 2000)
        }
    })

    return { deleteOrder }
}