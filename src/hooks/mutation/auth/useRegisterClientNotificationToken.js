//core
import { useMutation } from '@apollo/client'
import cuid from 'cuid'
import messaging from '@react-native-firebase/messaging'
import { useMMKVString } from 'react-native-mmkv'

//gql
import { REGISTER_CLIENT_NOTIFICATION_TOKEN } from '@gql_mutation/auth/RegisterClientNotificationToken'

export const useRegisterClientNotificationToken = () => {

    //global hooks
    const [token, setToken] = useMMKVString('token')

    // mutations
    const [registerToken] = useMutation(REGISTER_CLIENT_NOTIFICATION_TOKEN)

    //handles
    const registerClientNotificationToken = (phone, gToken) => {
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

    return { registerClientNotificationToken }

}