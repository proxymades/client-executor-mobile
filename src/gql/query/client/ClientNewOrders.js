import { gql } from '@apollo/client'

export const CLIENT_NEW_ORDERS = gql`
    query ClientNewOrders(
            $phone: String!
        ){
            clientNewOrders(
                phone: $phone
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
            }
        }
`