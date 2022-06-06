import { gql } from '@apollo/client'

export const CLIENT_READY_ORDERS = gql`
    query ClientReadyOrders{
            clientReadyOrders{
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