import { gql } from '@apollo/client'

export const DELETE_ORDER = gql`
        mutation DeleteOrder(                 
            $id: ID!
    ) {
            deleteOrder(
                id: $id
            )
    }
`