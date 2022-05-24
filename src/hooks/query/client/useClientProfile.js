//core
import { useQuery } from '@apollo/client'

//gql
import { CLIENT_PROFILE } from '@gql_query/client/ClientProfile'

export const useClientProfile = (phone) => {

    //queries
    const { data, loading } = useQuery(CLIENT_PROFILE, {
        fetchPolicy: 'network-only',
        variables: {
            phone: phone
        }
    })

    return {
        clientProfileLoading: loading,
        clientProfileData: data?.clientProfile
    }
}