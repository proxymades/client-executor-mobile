//core
import { gql } from '@apollo/client'

export const REGISTER_CLIENT_NOTIFICATION_TOKEN = gql`
    mutation RegisterClientNotificationToken(
            $id: ID!
            $phone: String!
            $token: String!
            ){
                registerClientNotificationToken(
                    id: $id
                    phone: $phone
                    token: $token
                )
            }
    `