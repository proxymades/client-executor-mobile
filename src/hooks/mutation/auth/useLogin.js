//core
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import jwt_decode from 'jwt-decode'

//gql
import { CLIENT_LOGIN } from '@gql_mutation/auth/ClientLogin'
import { EXECUTOR_LOGIN } from '@gql_mutation/auth/ExecutorLogin'

//hooks
import { useRegisterClientNotificationToken } from './useRegisterClientNotificationToken'
import { useRegisterExecutorNotificationToken } from './useRegisterExecutorNotificationToken'

//utils
import { isNotifedVar } from '@utils/cache'

export const useLogin = (loginState, type) => {

    //states
    const [logining, setLogining] = useState(false)

    //hooks
    const { registerClientNotificationToken } = useRegisterClientNotificationToken()
    const { registerExecutorNotificationToken } = useRegisterExecutorNotificationToken()

    //mutations
    const [clientLogin] = useMutation(CLIENT_LOGIN, {
        variables: {
            phone: loginState.phone,
            password: loginState.password
        },
        onCompleted: ({ clientLogin }) => {
            registerClientNotificationToken(jwt_decode(clientLogin.token).phone, clientLogin.token).catch(() => {
                isNotifedVar('Вход выполнен, push-уведомления недоступны')
            })
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
            registerExecutorNotificationToken(jwt_decode(executorLogin.token).phone, executorLogin.token).catch(() => {
                isNotifedVar('Вход выполнен, push-уведомления недоступны')
            })
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