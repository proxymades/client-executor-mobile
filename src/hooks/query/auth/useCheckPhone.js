//core
const { useLazyQuery } = require("@apollo/client")

//gql
const { CHECK_CLIENT_PHONE } = require("@gql_query/auth/CheckClientPhone")

export const useCheckPhone = (type) => {

    //queries
    const [checkClientPhone, { data: clientPhoneData }] = useLazyQuery(CHECK_CLIENT_PHONE, {
        fetchPolicy: 'network-only'
    })

    //handles
    const checkPhone = () => {
        type === 'client' && checkClientPhone()
    }

    return {
        checkPhone,
        phoneData: type === 'client' ? clientPhoneData : ''
    }
}