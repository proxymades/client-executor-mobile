import { gql } from '@apollo/client'

export const REPULSE_ORDER_WORK = gql`
        mutation RepulseOrderWork(                 
            $orderId: ID!
            $requestId: String!
    ) {
            repulseOrderWork(
                orderId: $orderId
                requestId: $requestId
            )
    }
`