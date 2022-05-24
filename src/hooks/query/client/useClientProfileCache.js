//core
import { useApolloClient } from '@apollo/client'

//gql
import { CLIENT_PROFILE } from '@gql_query/client/ClientProfile'

//utils
import { isUserPhoneVar } from '@utils/cache'

export const useClientProfileCache = () => {

    //global hooks
    const client = useApolloClient()

    //cache
    const profileQuery = client.readQuery({
        query: CLIENT_PROFILE,
        variables: {
            phone: isUserPhoneVar()
        }
    })

    return {
        profileQuery
    }
}