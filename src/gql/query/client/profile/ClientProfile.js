import { gql } from '@apollo/client'

export const CLIENT_PROFILE = gql`
    query ClientProfile{
            clientProfile{
                id
                avatar
                name
                phone
                verified
                createdAt
                order{
                    id
                }
                feedbackClient{
                    rating
                    message
                }
            }
        }
`