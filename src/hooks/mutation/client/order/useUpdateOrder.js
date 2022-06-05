//core
import { useMutation, useReactiveVar } from '@apollo/client'
import { ReactNativeFile } from 'apollo-upload-client'
import { useNavigation } from '@react-navigation/native'

//gql
import { UPDATE_ORDER } from '@gql_mutation/client/order/UpdateOrder'
import { UPLOAD_ORDER_IMAGE } from '@gql_mutation/client/order/UploadOrderImage'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useUpdateOrder = (formState, preview, orderId) => {

    //global hooks
    const navigation = useNavigation()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [updateOrder] = useMutation(UPDATE_ORDER, {
        variables: {
            id: orderId,
            header: formState.header,
            category: formState.category,
            count: formState.count,
            text: formState.text,
            city: formState.city,
            urgent: formState.urgent,
            image: formState.image,
        },
        refetchQueries: ['Order', 'ClientNewOrders'],
        onCompleted: () => {
            preview.image !== '' &&
                createImageFile(preview.image, orderId)
            setTimeout(() => {
                isNotifedVar(locale.orderUpdated_notify)
                navigation.goBack()
            }, 2000)
        }
    })

    const [uploadFile] = useMutation(UPLOAD_ORDER_IMAGE)

    //handles
    const createImageFile = (image, orderId) => {
        if (image) {
            const file = new ReactNativeFile({
                uri: image,
                name: 'file.jpg',
                type: 'image/jpeg',
            })
            setTimeout(() => uploadOrderImage(file, orderId), 300)
        }
    }

    const uploadOrderImage = (file, orderId) => {
        uploadFile({
            variables: {
                file: file,
                orderId: orderId
            }
        })
    }

    return { updateOrder }
}