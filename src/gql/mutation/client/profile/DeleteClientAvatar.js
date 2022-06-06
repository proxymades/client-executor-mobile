import { gql } from '@apollo/client'

export const DELETE_CLIENT_AVATAR = gql`
        mutation DeleteClientAvatar($phone: String!) {
            deleteClientAvatar(phone: $phone)
        }
`