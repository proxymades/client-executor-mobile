import { gql } from '@apollo/client'

export const EXECUTOR_PROFILE = gql`
    query ExecutorProfile{
            executorProfile{
                id
                avatar
                name
                phone
                verified
                createdAt
                orderRequest{
                    id
                }
                feedbackExecutor{
                    rating
                    message
                }
            }
        }
`