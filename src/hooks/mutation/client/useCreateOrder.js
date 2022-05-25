//core
import { useMutation } from '@apollo/client'
import cuid from 'cuid'
import { ReactNativeFile } from 'apollo-upload-client'
import { useNavigation } from '@react-navigation/native'

//gql
import { CREATE_ORDER } from '@gql_mutation/client/CreateOrder'
import { UPLOAD_ORDER_IMAGE } from '@gql_mutation/client/UploadOrderImage'

export const useCreateOrder = (formState) => {

    //global hooks
    const navigation = useNavigation()

    //mutations
    const [createOrder] = useMutation(CREATE_ORDER, {
        variables: {
            id: cuid(),
            header: formState.header,
            category: formState.category,
            count: formState.count,
            text: formState.text,
            city: formState.city,
            urgent: formState.urgent,
            image: formState.image,
        },
        refetchQueries: ['ClientProfile'],
        onCompleted: (data) => {
            createImageFile(formState.image, data.createOrder.id)
            setTimeout(() => navigation.goBack(), 2000)
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

    return { createOrder }
}