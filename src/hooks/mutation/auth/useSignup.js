//core
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import cuid from 'cuid'
import { useMMKVString } from 'react-native-mmkv'

//gql
import { CLIENT_SIGNUP } from '@gql_mutation/auth/ClientSignup'

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

    //handles
    const signup = () => {
        type === 'client' && clientSignup()
    }

    return {
        registering,
        setRegistering,
        signup
    }
}