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
                    name
                    verified
                    createdAt
                    order{
                        id
                    }
                }
                orderRequest{
                    id
                }
            }
        }
`