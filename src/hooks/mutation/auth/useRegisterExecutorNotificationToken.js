//core
import { useMutation } from '@apollo/client'
import cuid from 'cuid'
import messaging from '@react-native-firebase/messaging'
import { useMMKVString } from 'react-native-mmkv'

//gql
import { REGISTER_EXECUTOR_NOTIFICATION_TOKEN } from '@gql_mutation/auth/RegisterExecutorNotificationToken'

export const useRegisterExecutorNotificationToken = () => {

    //global hooks
    const [token, setToken] = useMMKVString('token')

    // mutations
    const [registerToken] = useMutation(REGISTER_EXECUTOR_NOTIFICATION_TOKEN)

    //handles
    const registerExecutorNotificationToken = (phone, gToken) => {
        messaging()
            .getToken()
            .then(token => {
                setToken(gToken)
                return registerToken({
                    variables: {
                        id: cuid(),
                        phone: phone,
                        token: token
                    }
                })
            })
    }

    return { registerExecutorNotificationToken }

}