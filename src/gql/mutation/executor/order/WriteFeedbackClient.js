import { gql } from '@apollo/client'

export const WRITE_FEEDBACK_CLIENT = gql`
        mutation WriteFeedbackClient(                 
            $id: ID!
            $rating: Int!
            $message: String
            $toUser: String!
            $orderId: String!
    ) {
            writeFeedbackClient(
                id: $id
                rating: $rating
                message: $message
                toUser: $toUser
                orderId: $orderId
            )
    }
`