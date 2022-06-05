import { gql } from '@apollo/client'

export const DELETE_ORDER_IMAGE = gql`
        mutation DeleteOrderImage(                 
            $orderId: String!
    ) {
            deleteOrderImage(
                orderId: $orderId
            )
    }
`