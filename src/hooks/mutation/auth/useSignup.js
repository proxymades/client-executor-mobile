//core
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import cuid from 'cuid'
import { useMMKVString } from 'react-native-mmkv'

//gql
import { CLIENT_SIGNUP } from '@gql_mutation/auth/ClientSignup'
import { EXECUTOR_SIGNUP } from '@gql_mutation/auth/ExecutorSignup'

//utils
import { isNotifedVar } from '@utils/cache'

export const useSignup = (signupState, type) => {

    //global hooks
    const [token, setToken] = useMMKVString('token')

    //states
    const [registering, setRegistering] = useState(false)

    //mutations
    const [clientSignup] = useMutation(CLIENT_SIGNUP, {
        variables: {
            id: cuid(),
            password: signupState.password.trim(),
            phone: signupState.phone.trim(),
            name: signupState.name.trim(),
        },
        onCompleted: ({ clientSignup }) => {
            setToken(clientSignup.token)
        },
        onError: (err) => {
            isNotifedVar(`${err.message}`)
            setRegistering(false)
            console.log(err.message);
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
            setToken(executorSignup.token)
        },
        onError: (err) => {
            isNotifedVar(`${err.message}`)
            setRegistering(false)
            console.log(err.message);
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