import { gql } from '@apollo/client'

export const EXECUTOR_FEEDBACKS = gql`
    query ExecutorFeedbacks{
                executorFeedbacks{
                    id
                    rating
                    message
                    createdAt
                    client{
                        id
                        name
                        avatar
                        verified
                    }
                }
            }
`