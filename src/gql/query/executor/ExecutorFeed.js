import { gql } from '@apollo/client'

export const EXECUTOR_FEED = gql`
    query ExecutorFeed(
            $city: [String!]
            $category: [String!]
        ){
            executorFeed(
                city: $city
                category: $category
            ){
                id
                header
                category
                count
                text
                city
                urgent
                image
                createdAt
            }
        }
`