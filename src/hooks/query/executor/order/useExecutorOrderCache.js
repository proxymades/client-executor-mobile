//core
import { useApolloClient } from '@apollo/client'

//gql
import { GET_EXECUTOR_ORDER } from '@gql_query/executor/order/GetExecutorOrder'

export const useExecutorOrderCache = (id) => {

    //global hooks
    const client = useApolloClient()

    //cache
    const orderQuery = client.readQuery({
        query: GET_EXECUTOR_ORDER,
        variables: {
            id: id
        }
    })

    return {
        orderQuery
    }
}