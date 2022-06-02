import { gql } from '@apollo/client'

export const EXECUTOR_PROFILE = gql`
    query ExecutorProfile(
            $phone: String!
        ){
            executorProfile(
                phone: $phone
            ){
                id
                avatar
                name
                phone
                verified
                createdAt
            }
        }
`