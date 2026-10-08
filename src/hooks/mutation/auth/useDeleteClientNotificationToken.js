//core
import { useMutation } from '@apollo/client'

//gql
import { DELETE_CLIENT_NOTIFICATION_TOKEN } from '@gql_mutation/auth/DeleteClientNotificationToken'

export const useDeleteClientNotificationToken = () => {

    // mutations
    const [deleteToken] = useMutation(DELETE_CLIENT_NOTIFICATION_TOKEN)

    //handles
    const deleteClientNotificationToken = (phone, token) => {
        return deleteToken({
            variables: {
                phone: phone,
                token: token
            }
        })
    }

    return { deleteClientNotificationToken }

}