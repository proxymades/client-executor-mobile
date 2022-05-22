import { gql } from '@apollo/client'

export const SIGNUP = gql`
    mutation Signup(
            $id: ID!
            $phone: String!
            $password: String!
            $fullName: String!
        ){
            signup(
                id: $id
                phone: $phone
                password: $password
                fullName: $fullName
            ){
                token
        }
    }
`