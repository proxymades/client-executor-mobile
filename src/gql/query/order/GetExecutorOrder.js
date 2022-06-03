import { gql } from '@apollo/client'

export const GET_EXECUTOR_ORDER = gql`
    query GetExecutorOrder(
            $id: ID!
        ){
            getExecutorOrder(
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