import { gql } from '@apollo/client'

export const CLIENT_ORDER_REQUESTS = gql`
    query ClientOrderRequests{
            clientOrderRequests{
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