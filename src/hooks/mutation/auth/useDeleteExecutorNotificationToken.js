//core
import { useMutation } from '@apollo/client'

//gql
import { DELETE_EXECUTOR_NOTIFICATION_TOKEN } from '@gql_mutation/auth/DeleteExecutorNotificationToken'

export const useDeleteExecutorNotificationToken = () => {

    // mutations
    const [deleteToken] = useMutation(DELETE_EXECUTOR_NOTIFICATION_TOKEN)

    //handles
    const deleteExecutorNotificationToken = (phone, token) => {
        return deleteToken({
            variables: {
                phone: phone,
                token: token
            }
        })
    }

    return { deleteExecutorNotificationToken }

}