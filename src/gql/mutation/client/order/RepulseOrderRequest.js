import { gql } from '@apollo/client'

export const REPULSE_ORDER_REQUEST = gql`
        mutation RepulseOrderRequest(                 
            $requestId: ID!
            $orderId: String!
    ) {
            repulseOrderRequest(
                requestId: $requestId
                orderId: $orderId
            )
    }
`