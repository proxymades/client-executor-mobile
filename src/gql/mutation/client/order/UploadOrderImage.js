import { gql } from '@apollo/client'

export const UPLOAD_ORDER_IMAGE = gql`
        mutation UploadOrderImage(
                    $file: Upload!
                    $orderId: String!
                ){
                    uploadOrderImage(
                        file: $file
                        orderId: $orderId
                    ) 
                }
`