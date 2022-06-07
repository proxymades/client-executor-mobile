//core
import { gql } from '@apollo/client'

export const REGISTER_EXECUTOR_NOTIFICATION_TOKEN = gql`
    mutation RegisterExecutorNotificationToken(
            $id: ID!
            $phone: String!
            $token: String!
            ){
                registerExecutorNotificationToken(
                    id: $id
                    phone: $phone
                    token: $token
                )
            }
    `