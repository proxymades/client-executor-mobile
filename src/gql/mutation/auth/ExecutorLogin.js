//core
import { gql } from '@apollo/client'

export const EXECUTOR_LOGIN = gql`
    mutation ExecutorLogin(
        $phone: String!
        $password: String!
        ){
            executorLogin(
                phone: $phone
                password: $password
            ){
                token
            }
        }
    `