import { gql } from '@apollo/client'

export const CLIENT_ORDER = gql`
    query ClientOrder(
            $id: ID!
        ){
            clientOrder(
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