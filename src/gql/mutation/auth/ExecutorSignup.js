import { gql } from '@apollo/client'

export const EXECUTOR_SIGNUP = gql`
    mutation ExecutorSignup(
            $id: ID!
            $phone: String!
            $password: String!
            $name: String!
        ){
            executorSignup(
                id: $id
                phone: $phone
                password: $password
                name: $name
            ){
                token
        }
    }
`