import { gql } from '@apollo/client'

export const SIGNUP = gql`
    mutation Signup(
            $id: ID!
            $username: String!
            $password: String!
            $regPhone: String!
            $fullName: String!
        ){
            signup(
                id: $id
                username: $username
                password: $password
                regPhone: $regPhone
                fullName: $fullName
            ){
                token
        }
    }
`