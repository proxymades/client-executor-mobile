import { gql } from '@apollo/client'

export const CLIENT_PROFILE = gql`
    query ClientProfile(
            $phone: String!
        ){
            clientProfile(
                phone: $phone
            ){
                id
                avatar
                name
                phone
                verified
                createdAt
                order{
                    id
                }
            }
        }
`