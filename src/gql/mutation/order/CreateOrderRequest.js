import { gql } from '@apollo/client'

export const CREATE_ORDER_REQUEST = gql`
        mutation CreateOrderRequest(                 
            $id: ID!
            $orderId: String!
            $offer: String!
    ) {
            createOrderRequest(
                id: $id
                orderId: $orderId
                offer: $offer
            )
    }
`