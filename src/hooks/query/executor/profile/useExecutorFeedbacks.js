//core
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_FEEDBACKS } from '@gql_query/executor/profile/ExecutorFeedbacks'

export const useExecutorFeedbacks = () => {

    //queries
    const { loading, data, refetch } = useQuery(EXECUTOR_FEEDBACKS, {
        fetchPolicy: 'network-only',
    })

    return {
        executorFeedbacksLoading: loading,
        executorFeedbacksData: data?.executorFeedbacks,
        executorFeedbacksRefetch: refetch,
    }
}