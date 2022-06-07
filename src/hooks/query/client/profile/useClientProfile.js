//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_PROFILE } from '@gql_query/client/profile/ClientProfile'

export const useClientProfile = () => {

    //queries
    const { data, loading, refetch } = useQuery(CLIENT_PROFILE, {
        fetchPolicy: 'network-only',
    })

    return {
        clientProfileLoading: loading,
        clientProfileData: data?.clientProfile,
        clientProfileRefetch: refetch,
    }
}