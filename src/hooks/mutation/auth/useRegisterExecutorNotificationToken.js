//core
import { useMutation } from '@apollo/client'
import cuid from 'cuid'
import messaging from '@react-native-firebase/messaging'

//gql
import { REGISTER_EXECUTOR_NOTIFICATION_TOKEN } from '@gql_mutation/auth/RegisterExecutorNotificationToken'

export const useRegisterExecutorNotificationToken = () => {

    // mutations
    const [registerToken] = useMutation(REGISTER_EXECUTOR_NOTIFICATION_TOKEN)

    //handles
    const registerExecutorNotificationToken = (phone) => {
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

    return { registerExecutorNotificationToken }

}