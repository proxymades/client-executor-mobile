//core
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import cuid from 'cuid'
import { useMMKVString } from 'react-native-mmkv'

//gql
import { SIGNUP } from '@gql_mutation/auth/Signup'

//utils
import { isNotifedVar } from '@utils/cache'

export const useSignup = (signupState) => {

    //global hooks
    const [token, setToken] = useMMKVString('token')

    //states
    const [registering, setRegistering] = useState(false)

    //mutations
    const [signup] = useMutation(SIGNUP, {
        variables: {
            id: cuid(),
            password: signupState.password.trim(),
            phone: signupState.phone.trim(),
            fullName: signupState.fullName.trim(),
        },
        onCompleted: ({ signup }) => {
            setToken(signup.token)
        },
        onError: (err) => {
            isNotifedVar(`${err.message}`)
            setRegistering(false)
        }
    })

    return {
        registering,
        setRegistering,
        signup
    }
}