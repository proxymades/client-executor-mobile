//core
import { useMutation } from '@apollo/client'

//gql
import { DELETE_EXECUTOR_AVATAR } from '@gql_mutation/executor/DeleteExecutorAvatar'

//utils
import { isUserPhoneVar } from '@utils/cache'

export const useDeleteExecutorAvatar = () => {

    //mutations
    const [deleteExecutorAvatar] = useMutation(DELETE_EXECUTOR_AVATAR, {
        variables: {
            phone: isUserPhoneVar()
        }
    })

    return {
        deleteExecutorAvatar
    }
}