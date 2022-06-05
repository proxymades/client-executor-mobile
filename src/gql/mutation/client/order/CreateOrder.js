import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
        mutation CreateOrder(                 
            $id: ID!
            $header: String!
            $category: String!
            $count: String!
            $text:  String!
            $city:  String!
            $urgent: Boolean!
            $image: String        
    ) {
            createOrder(
                id: $id
                header: $header
                category: $category
                count: $count
                text: $text
                city: $city
                urgent: $urgent
                image: $image
            ){
                id
            }
    }
`