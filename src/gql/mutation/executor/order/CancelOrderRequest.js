import { gql } from '@apollo/client'

export const CANCEL_ORDER_REQUEST = gql`
        mutation CancelOrderRequest(                 
            $orderId: ID!
    ) {
            cancelOrderRequest(
                orderId: $orderId
            )
    }
`