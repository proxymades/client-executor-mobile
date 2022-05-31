import { gql } from '@apollo/client'

export const ORDER = gql`
    query Order(
            $id: ID!
        ){
            order(
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
            }
        }
`