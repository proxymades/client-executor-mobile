//core
import { gql } from '@apollo/client'

export const CLIENT_LOGIN = gql`
    mutation ClientLogin(
        $phone: String!
        $password: String!
        ){
            clientLogin(
                phone: $phone
                password: $password
            ){
                token
            }
        }
    `