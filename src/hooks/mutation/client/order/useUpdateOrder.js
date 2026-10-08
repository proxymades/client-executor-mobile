import { useApolloClient, useMutation, useReactiveVar } from '@apollo/client'
import { ReactNativeFile } from 'apollo-upload-client'
import { useNavigation } from '@react-navigation/native'
import { UPDATE_ORDER } from '@gql_mutation/client/order/UpdateOrder'
import { UPLOAD_ORDER_IMAGE } from '@gql_mutation/client/order/UploadOrderImage'
import { isNotifedVar, localeVar } from '@utils/cache'

export const useUpdateOrder = (formState, preview, orderId, setUpdating) => {
    const navigation = useNavigation()
    const client = useApolloClient()
    const locale = useReactiveVar(localeVar)
    const [update] = useMutation(UPDATE_ORDER)
    const [upload] = useMutation(UPLOAD_ORDER_IMAGE)

    const updateOrder = async () => {
        let saved = false
        try {
            await update({ variables: { ...formState, id: orderId } })
            saved = true
            if (preview.image) {
                await upload({ variables: {
                    file: new ReactNativeFile({ uri: preview.image, name: 'file.jpg', type: 'image/jpeg' }),
                    orderId,
                } })
            }
            await client.refetchQueries({ include: 'active' })
            isNotifedVar(locale.orderUpdated_notify)
        } catch (error) {
            isNotifedVar(saved ? `${locale.orderUpdated_notify}. ${error.message}` : error.message)
        } finally {
            setUpdating(false)
            if (saved) navigation.goBack()
        }
    }
    return { updateOrder }
}
