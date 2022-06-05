import { gql } from '@apollo/client'

export const UPLOAD_EXECUTOR_AVATAR = gql`
        mutation UploadExecutorAvatar($file: Upload!) {
            uploadExecutorAvatar(file: $file) 
        }
`