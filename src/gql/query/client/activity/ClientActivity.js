import { gql } from '@apollo/client'

export const CLIENT_ACTIVITY = gql`
    query ClientActivity{
            clientActivity{
                id
                offer
                createdAt
                order{
                    id
                    header
                    image
                }
                executor{
                    id
                    name
                    avatar
                    phone
                    verified
                    createdAt
                    orderRequest{
                        id
                    }
                }
            }
        }
`