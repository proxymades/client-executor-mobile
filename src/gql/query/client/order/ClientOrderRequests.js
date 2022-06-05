import { gql } from '@apollo/client'

export const CLIENT_ORDER_REQUESTS = gql`
    query ClientOrderRequests($orderId: ID!){
            clientOrderRequests(orderId: $orderId){
                id
                offer
                accepted
                createdAt
                order{
                    id
                    header
                    image
                }
                executor{
                    id
                    name
                    avatar
                    phone
                    verified
                    createdAt
                    orderRequest{
                        id
                    }
                }
            }
        }
`