import { useCallback } from 'react'
import { useMutation } from '@apollo/client'
import cuid from 'cuid'
import messaging from '@react-native-firebase/messaging'
import { REGISTER_CLIENT_NOTIFICATION_TOKEN } from '@gql_mutation/auth/RegisterClientNotificationToken'
import { setSession } from '@utils/session'

export const useRegisterClientNotificationToken = () => {
    const [registerToken] = useMutation(REGISTER_CLIENT_NOTIFICATION_TOKEN)
    const registerClientNotificationToken = useCallback(async (phone, authToken, refreshedToken) => {
        const user = setSession(authToken)
        if (!user || user.type !== 'client' || user.phone !== phone) return
        const token = refreshedToken || await messaging().getToken()
        return registerToken({
            variables: { id: cuid(), phone: user.phone, token },
            context: { headers: { authorization: `Bearer ${authToken}` } },
        })
    }, [registerToken])
    return { registerClientNotificationToken }
}
