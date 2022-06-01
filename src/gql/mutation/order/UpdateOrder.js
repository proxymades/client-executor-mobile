import { gql } from '@apollo/client'

export const UPDATE_ORDER = gql`
        mutation UpdateOrder(                 
            $id: ID!
            $header: String!
            $category: String!
            $count: String!
            $text:  String!
            $city:  String!
            $urgent: Boolean!
            $image: String        
    ) {
            updateOrder(
                id: $id
                header: $header
                category: $category
                count: $count
                text: $text
                city: $city
                urgent: $urgent
                image: $image
            )
    }
`