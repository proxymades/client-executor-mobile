//core
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useMMKVString } from 'react-native-mmkv'

//gql
import { CLIENT_LOGIN } from '@gql_mutation/auth/ClientLogin'
import { EXECUTOR_LOGIN } from '@gql_mutation/auth/ExecutorLogin'

//utils
import { isNotifedVar } from '@utils/cache'

export const useLogin = (loginState, type) => {

    //global hooks
    const [token, setToken] = useMMKVString('token')

    //states
    const [logining, setLogining] = useState(false)

    //mutations
    const [clientLogin] = useMutation(CLIENT_LOGIN, {
        variables: {
            phone: loginState.phone,
            password: loginState.password
        },
        onCompleted: ({ clientLogin }) => {
            setToken(clientLogin.token)
        },
        onError: (err) => {
            isNotifedVar(`${err.message}`)
            setLogining(false)
        }
    })

    const [executorLogin] = useMutation(EXECUTOR_LOGIN, {
        variables: {
            phone: loginState.phone,
            password: loginState.password
        },
        onCompleted: ({ executorLogin }) => {
            setToken(executorLogin.token)
        },
        onError: (err) => {
            isNotifedVar(`${err.message}`)
            setLogining(false)
        }
    })

    //handles
    const login = () => {
        type === 'client' && clientLogin()
        type === 'executor' && executorLogin()
    }

    return {
        logining,
        setLogining,
        login
    }
}