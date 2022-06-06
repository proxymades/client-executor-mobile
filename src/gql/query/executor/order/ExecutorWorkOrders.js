import { gql } from '@apollo/client'

export const EXECUTOR_WORK_ORDERS = gql`
    query ExecutorWorkOrders{
            executorWorkOrders{
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