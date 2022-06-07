import { gql } from '@apollo/client'

export const EXECUTOR_ORDER = gql`
    query ExecutorOrder(
            $id: ID!
        ){
            executorOrder(
                id: $id
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
                isReady
                isWork
                client{
                    id
                    name
                    verified
                    createdAt
                    order{
                        id
                    }
                    feedbackClient{
                        rating
                        message
                    }
                }
                orderRequest{
                    id
                }
            }
        }
`