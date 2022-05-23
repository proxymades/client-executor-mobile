import { gql } from '@apollo/client'

export const CHECK_CLIENT_PHONE = gql`
    query CheckClientPhone(
            $phone: String!
        ){
            checkClientPhone(
                phone: $phone
            ) 
        }
`