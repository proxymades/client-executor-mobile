//core
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_ACTIVITY } from '@gql_query/executor/activity/ExecutorActivity'

export const useExecutorActivity = () => {

    //queries
    const { loading, data, refetch } = useQuery(EXECUTOR_ACTIVITY, {
        fetchPolicy: 'network-only',
    })

    return {
        executorActivityLoading: loading,
        executorActivityData: data?.executorActivity,
        executorActivityRefetch: refetch,
    }
}