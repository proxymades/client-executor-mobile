//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_FEEDBACKS } from '@gql_query/client/profile/ClientFeedbacks'

export const useClientFeedbacks = () => {

    //queries
    const { loading, data, refetch } = useQuery(CLIENT_FEEDBACKS, {
        fetchPolicy: 'network-only',
    })

    return {
        clientFeedbacksLoading: loading,
        clientFeedbacksData: data?.clientFeedbacks,
        clientFeedbacksRefetch: refetch,
    }
}