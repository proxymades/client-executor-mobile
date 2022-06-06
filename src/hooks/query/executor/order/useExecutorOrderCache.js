//core
import { useApolloClient } from '@apollo/client'

//gql
import { EXECUTOR_ORDER } from '@gql_query/executor/order/ExecutorOrder'

export const useExecutorOrderCache = (id) => {

    //global hooks
    const client = useApolloClient()

    //cache
    const orderQuery = client.readQuery({
        query: EXECUTOR_ORDER,
        variables: {
            id: id
        }
    })

    return {
        orderQuery
    }
}