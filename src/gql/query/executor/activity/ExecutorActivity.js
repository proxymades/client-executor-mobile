import { gql } from '@apollo/client'

export const EXECUTOR_ACTIVITY = gql`
    query ExecutorActivity{
            executorActivity{
                id
                offer
                accepted
                finished
                createdAt
                order{
                    id
                    header
                    image
                    client{
                        id
                        name
                        avatar
                        phone
                        verified
                        createdAt
                        order{
                            id
                        }
                        feedbackClient{
                            rating
                            message
                            orderId
                        }
                    }
                }
            }
        }
`