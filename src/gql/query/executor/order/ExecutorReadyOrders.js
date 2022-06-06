import { gql } from '@apollo/client'

export const EXECUTOR_READY_ORDERS = gql`
    query ExecutorReadyOrders{
            executorReadyOrders{
                id
                order{
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
        }
`