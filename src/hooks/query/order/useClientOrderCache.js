//core
import { useApolloClient } from '@apollo/client'

//gql
import { GET_CLIENT_ORDER } from '@gql_query/order/GetClientOrder'

export const useClientOrderCache = (id) => {

    //global hooks
    const client = useApolloClient()

    //cache
    const orderQuery = client.readQuery({
        query: GET_CLIENT_ORDER,
        variables: {
            id: id
        }
    })

    return {
        orderQuery
    }
}