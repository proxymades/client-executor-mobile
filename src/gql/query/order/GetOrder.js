import { gql } from '@apollo/client'

export const GET_ORDER = gql`
    query GetOrder(
            $id: ID!
        ){
            getOrder(
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