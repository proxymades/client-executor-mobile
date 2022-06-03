//core
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_PROFILE } from '@gql_query/executor/ExecutorProfile'

export const useExecutorProfile = (phone) => {

    //queries
    const { data, loading } = useQuery(EXECUTOR_PROFILE, {
        fetchPolicy: 'network-only',
        variables: {
            phone: phone
        }
    })

    return {
        executorProfileLoading: loading,
        executorProfileData: data?.executorProfile,
        worksCount: data?.executorProfile.orderRequest.length,
    }
}