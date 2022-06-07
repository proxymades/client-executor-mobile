//core
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_PROFILE } from '@gql_query/executor/profile/ExecutorProfile'

export const useExecutorProfile = () => {

    //queries
    const { data, loading, refetch } = useQuery(EXECUTOR_PROFILE, {
        fetchPolicy: 'network-only',
    })

    return {
        executorProfileLoading: loading,
        executorProfileData: data?.executorProfile,
        worksCount: data?.executorProfile.orderRequest.length,
        executorProfileRefetch: refetch,
    }
}