//core
import { useMutation, useReactiveVar } from '@apollo/client'

//gql
import { DELETE_ORDER_IMAGE } from '@gql_mutation/order/DeleteOrderImage'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useDeleteOrderImage = (orderId) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [deleteOrderImage] = useMutation(DELETE_ORDER_IMAGE, {
        variables: {
            orderId: orderId
        },
        refetchQueries: ['Order'],
        onCompleted: () => {
            isNotifedVar(locale.orderImageDeleted_notify)
        }
    })

    return { deleteOrderImage }
}