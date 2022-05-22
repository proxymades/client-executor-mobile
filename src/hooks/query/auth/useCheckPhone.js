//core
const { useLazyQuery } = require("@apollo/client")

//gql
const { CHECK_PHONE } = require("@gql_query/auth/CheckPhone")

export const useCheckPhone = () => {

    //queries
    const [checkPhone, { data: phoneData }] = useLazyQuery(CHECK_PHONE, {
        fetchPolicy: 'network-only'
    })

    return { checkPhone, phoneData }
}