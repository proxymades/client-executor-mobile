import { gql } from '@apollo/client'

export const CLIENT_WORK_ORDERS = gql`
    query ClientWorkOrders{
            clientWorkOrders{
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