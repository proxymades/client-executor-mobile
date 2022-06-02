//core
import { useMutation } from '@apollo/client'

//gql
import { UPLOAD_EXECUTOR_AVATAR } from '@gql_mutation/executor/UploadExecutorAvatar'

export const useUploadExecutorAvatar = () => {

    //mutations
    const [uploadFile] = useMutation(UPLOAD_EXECUTOR_AVATAR)

    //handles
    const uploadExecutorAvatar = (file) => {
        uploadFile({
            variables: {
                file: file
            }
        })
    }

    return { uploadExecutorAvatar }
}