//core
import { useMutation } from '@apollo/client'

//gql
import { UPLOAD_CLIENT_AVATAR } from '@gql_mutation/client/UploadClientAvatar'

export const useUploadClientAvatar = () => {

    //mutations
    const [uploadFile] = useMutation(UPLOAD_CLIENT_AVATAR)

    //handles
    const uploadClientAvatar = (file) => {
        uploadFile({
            variables: {
                file: file
            }
        })
    }

    return {
        uploadClientAvatar
    }
}