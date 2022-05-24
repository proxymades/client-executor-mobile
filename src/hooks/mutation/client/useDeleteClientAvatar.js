//core
import { useMutation } from '@apollo/client'

//gql
import { DELETE_CLIENT_AVATAR } from '@gql_mutation/client/DeleteClientAvatar'

//utils
import { isUserPhoneVar } from '@utils/cache'

export const useDeleteClientAvatar = () => {

    //mutations
    const [deleteClientAvatar] = useMutation(DELETE_CLIENT_AVATAR, {
        variables: {
            phone: isUserPhoneVar()
        }
    })

    return {
        deleteClientAvatar
    }
}