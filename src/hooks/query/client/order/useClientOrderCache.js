//core
import { useApolloClient } from '@apollo/client'

//gql
import { CLIENT_ORDER } from '@gql_query/client/order/ClientOrder'

export const useClientOrderCache = (id) => {

    //global hooks
    const client = useApolloClient()

    //cache
    const orderQuery = client.readQuery({
        query: CLIENT_ORDER,
        variables: {
            id: id
        }
    })

    return { orderQuery }
}