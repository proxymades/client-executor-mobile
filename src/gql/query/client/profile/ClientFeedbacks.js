import { gql } from '@apollo/client'

export const CLIENT_FEEDBACKS = gql`
    query ClientFeedbacks{
                clientFeedbacks{
                    id
                    rating
                    message
                    createdAt
                    executor{
                        id
                        name
                        avatar
                        verified
                    }
                }
            }
`