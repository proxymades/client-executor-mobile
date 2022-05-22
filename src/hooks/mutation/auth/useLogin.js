//core
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useMMKVString } from 'react-native-mmkv'

//gql
import { LOGIN } from '@gql_mutation/auth/Login'

//utils
import { isNotifedVar } from '@utils/cache'

export const useLogin = (loginState) => {

    //global hooks
    const [token, setToken] = useMMKVString('token')

    //states
    const [logining, setLogining] = useState(false)

    //mutations
    const [login] = useMutation(LOGIN, {
        variables: {
            phone: loginState.phone,
            password: loginState.password
        },
        onCompleted: ({ login }) => {
            setToken(login.token)
        },
        onError: (err) => {
            isNotifedVar(`${err.message}`)
            setLogining(false)
        }
    })

    return {
        logining,
        setLogining,
        login
    }
}