//core
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import cuid from 'cuid'
import jwt_decode from 'jwt-decode'

//gql
import { CLIENT_SIGNUP } from '@gql_mutation/auth/ClientSignup'
import { EXECUTOR_SIGNUP } from '@gql_mutation/auth/ExecutorSignup'

//hooks
import { useRegisterClientNotificationToken } from './useRegisterClientNotificationToken'
import { useRegisterExecutorNotificationToken } from './useRegisterExecutorNotificationToken'

//utils
import { isNotifedVar } from '@utils/cache'

export const useSignup = (signupState, type) => {

    //states
    const [registering, setRegistering] = useState(false)

    //hooks
    const { registerClientNotificationToken } = useRegisterClientNotificationToken()
    const { registerExecutorNotificationToken } = useRegisterExecutorNotificationToken()

    //mutations
    const [clientSignup] = useMutation(CLIENT_SIGNUP, {
        variables: {
            id: cuid(),
            password: signupState.password.trim(),
            phone: signupState.phone.trim(),
            name: signupState.name.trim(),
        },
        onCompleted: ({ clientSignup }) => {
            registerClientNotificationToken(jwt_decode(clientSignup.token).phone, clientSignup.token).catch(() => {
                isNotifedVar('Вход выполнен, push-уведомления недоступны')
            })
        },
        onError: (err) => {
            isNotifedVar(`${err.message}`)
            setRegistering(false)
        }
    })

    const [executorSignup] = useMutation(EXECUTOR_SIGNUP, {
        variables: {
            id: cuid(),
            password: signupState.password.trim(),
            phone: signupState.phone.trim(),
            name: signupState.name.trim(),
        },
        onCompleted: ({ executorSignup }) => {
            registerExecutorNotificationToken(jwt_decode(executorSignup.token).phone, executorSignup.token).catch(() => {
                isNotifedVar('Вход выполнен, push-уведомления недоступны')
            })
        },
        onError: (err) => {
            isNotifedVar(`${err.message}`)
            setRegistering(false)
        }
    })

    //handles
    const signup = () => {
        type === 'client' && clientSignup()
        type === 'executor' && executorSignup()
    }

    return {
        registering,
        setRegistering,
        signup
    }
}