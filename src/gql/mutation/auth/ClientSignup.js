import { gql } from '@apollo/client'

export const CLIENT_SIGNUP = gql`
    mutation ClientSignup(
            $id: ID!
            $phone: String!
            $password: String!
            $name: String!
        ){
            clientSignup(
                id: $id
                phone: $phone
                password: $password
                name: $name
            ){
                token
        }
    }
`