//core
import { gql } from '@apollo/client'

export const DELETE_CLIENT_NOTIFICATION_TOKEN = gql`
    mutation DeleteClientNotificationToken(
            $phone: String!
            $token: String!
            ){
                deleteClientNotificationToken(
                    phone: $phone
                    token: $token
                )
            }
    `