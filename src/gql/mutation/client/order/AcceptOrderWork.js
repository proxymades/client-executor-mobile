import { gql } from '@apollo/client'

export const ACCEPT_ORDER_WORK = gql`
        mutation AcceptOrderWork(                 
            $orderId: ID!
            $requestId: String!
    ) {
            acceptOrderWork(
                orderId: $orderId
                requestId: $requestId
            )
    }
`