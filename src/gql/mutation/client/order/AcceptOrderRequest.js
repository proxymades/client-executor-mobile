import { gql } from '@apollo/client'

export const ACCEPT_ORDER_REQUEST = gql`
        mutation AcceptOrderRequest(                 
            $requestId: ID!
            $previousRequestId: String
            $orderId: String!
    ) {
            acceptOrderRequest(
                requestId: $requestId
                previousRequestId: $previousRequestId
                orderId: $orderId
            )
    }
`