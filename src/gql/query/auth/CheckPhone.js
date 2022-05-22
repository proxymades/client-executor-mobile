import { gql } from '@apollo/client'

export const CHECK_PHONE = gql`
    query CheckPhone(
            $phone: String!
        ){
            checkPhone(
                phone: $phone
            ) 
        }
`