import { gql } from '@apollo/client'

export const WRITE_FEEDBACK_EXECUTOR = gql`
        mutation WriteFeedbackExecutor(                 
            $id: ID!
            $rating: Int!
            $message: String
            $toUser: String!
            $orderId: String!
    ) {
            writeFeedbackExecutor(
                id: $id
                rating: $rating
                message: $message
                toUser: $toUser
                orderId: $orderId
            )
    }
`