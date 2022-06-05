import { gql } from '@apollo/client'

export const UPLOAD_CLIENT_AVATAR = gql`
        mutation UploadClientAvatar($file: Upload!) {
            uploadClientAvatar(file: $file) 
        }
`