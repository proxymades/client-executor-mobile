import { gql } from '@apollo/client'

export const EXECUTOR_ORDER_REQUESTS = gql`
    query ExecutorOrderRequests(
            $phone: String!
        ){
            executorOrderRequests(
                phone: $phone
            ){
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