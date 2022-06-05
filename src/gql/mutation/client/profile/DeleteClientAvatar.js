import { gql } from '@apollo/client'

export const DELETE_EXECUTOR_AVATAR = gql`
        mutation DeleteExecutorAvatar($phone: String!) {
            deleteExecutorAvatar(phone: $phone)
        }
`