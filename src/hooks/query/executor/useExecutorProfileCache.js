//core
import { useApolloClient } from '@apollo/client'

//gql
import { EXECUTOR_PROFILE } from '@gql_query/executor/ExecutorProfile'

//utils
import { isUserPhoneVar } from '@utils/cache'

export const useExecutorProfileCache = () => {

    //global hooks
    const client = useApolloClient()

    //cache
    const profileQuery = client.readQuery({
        query: EXECUTOR_PROFILE,
        variables: {
            phone: isUserPhoneVar()
        }
    })

    return {
        profileQuery
    }
}