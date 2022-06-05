import { gql } from '@apollo/client'

export const CLIENT_ORDERS_REQUESTS = gql`
    query ClientOrdersRequests{
            clientOrdersRequests{
                id
                offer
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