import { gql } from '@apollo/client'

export const UPDATE_EXECUTOR_PROFILE = gql`
        mutation UpdateExecutorProfile(                 
            $phone: String!
            $name: String!
            $avatar: String         
    ) {
            updateExecutorProfile(
                phone: $phone
                name: $name
                avatar: $avatar
            ) 
    }
`