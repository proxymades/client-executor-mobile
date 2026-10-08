import { useApolloClient, useMutation, useReactiveVar } from '@apollo/client'
import cuid from 'cuid'
import { ReactNativeFile } from 'apollo-upload-client'
import { useNavigation } from '@react-navigation/native'
import { CREATE_ORDER } from '@gql_mutation/client/order/CreateOrder'
import { UPLOAD_ORDER_IMAGE } from '@gql_mutation/client/order/UploadOrderImage'
import { isNotifedVar, localeVar } from '@utils/cache'

export const useCreateOrder = (formState, setCreating) => {
    const navigation = useNavigation()
    const client = useApolloClient()
    const locale = useReactiveVar(localeVar)
    const [create] = useMutation(CREATE_ORDER)
    const [upload] = useMutation(UPLOAD_ORDER_IMAGE)

    const createOrder = async () => {
        let saved = false
        try {
            const { data } = await create({ variables: { ...formState, id: cuid() } })
            saved = true
            if (formState.image) {
                await upload({ variables: {
                    file: new ReactNativeFile({ uri: formState.image, name: 'file.jpg', type: 'image/jpeg' }),
                    orderId: data.createOrder.id,
                } })
            }
            await client.refetchQueries({ include: 'active' })
            isNotifedVar(locale.orderCreated_notify)
        } catch (error) {
            // An order saved before an upload/refetch failure must not be created again.
            isNotifedVar(saved ? `${locale.orderCreated_notify}. ${error.message}` : error.message)
        } finally {
            setCreating(false)
            if (saved) navigation.goBack()
        }
    }
    return { createOrder }
}
