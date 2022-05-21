import { gql } from '@apollo/client'

export const CHECK_REG_PHONE = gql`
    query CheckRegPhone(
            $regPhone: String!
        ){
            checkRegPhone(
                regPhone: $regPhone
            ) 
        }
`