//core
import { useMutation } from '@apollo/client'
import cuid from 'cuid'
import messaging from '@react-native-firebase/messaging'

//gql
import { REGISTER_CLIENT_NOTIFICATION_TOKEN } from '@gql_mutation/auth/RegisterClientNotificationToken'

export const useRegisterClientNotificationToken = () => {

    // mutations
    const [registerToken] = useMutation(REGISTER_CLIENT_NOTIFICATION_TOKEN)

    //handles
    const registerClientNotificationToken = (phone) => {
        messaging()
            .getToken()
            .then(token => {
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