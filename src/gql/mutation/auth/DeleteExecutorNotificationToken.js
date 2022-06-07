//core
import { gql } from '@apollo/client'

export const DELETE_EXECUTOR_NOTIFICATION_TOKEN = gql`
    mutation DeleteExecutorNotificationToken(
            $phone: String!
            $token: String!
            ){
                deleteExecutorNotificationToken(
                    phone: $phone
                    token: $token
                )
            }
    `