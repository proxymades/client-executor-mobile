//core
import { useApolloClient } from '@apollo/client'

//gql
import { ORDER } from '@gql_query/order/Order'

export const useOrderCache = (id) => {

    //global hooks
    const client = useApolloClient()

    //cache
    const orderQuery = client.readQuery({
        query: ORDER,
        variables: {
            id: id
        }
    })

    return {
        orderQuery
    }
}