import { gql } from '@apollo/client'

export const UPDATE_CLIENT_PROFILE = gql`
        mutation UpdateClientProfile(                 
            $phone: String!
            $name: String!
            $avatar: String         
    ) {
            updateClientProfile(
                phone: $phone
                name: $name
                avatar: $avatar
            ) 
    }
`