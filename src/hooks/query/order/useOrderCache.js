//core
import { useApolloClient } from '@apollo/client'

//gql
import { GET_ORDER } from '@gql_query/order/GetOrder'

export const useOrderCache = (id) => {

    //global hooks
    const client = useApolloClient()

    //cache
    const orderQuery = client.readQuery({
        query: GET_ORDER,
        variables: {
            id: id
        }
    })

    return {
        orderQuery
    }
}