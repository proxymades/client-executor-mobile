import { gql } from '@apollo/client'

export const GET_CLIENT_ORDER = gql`
    query GetClientOrder(
            $id: ID!
        ){
            getClientOrder(
                id: $id
            ){
                id
                header
                category
                count
                text
                city
                urgent
                image
                createdAt
                isWork
                isReady
            }
        }
`