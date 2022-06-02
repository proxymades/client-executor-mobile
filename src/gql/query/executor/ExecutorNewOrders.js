import { gql } from '@apollo/client'

export const EXECUTOR_NEW_ORDERS = gql`
    query ExecutorNewOrders(
            $city: [String!]
            $category: [String!]
        ){
            executorNewOrders(
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