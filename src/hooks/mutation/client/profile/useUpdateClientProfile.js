//core
import { useMutation, useReactiveVar } from '@apollo/client'

//gql
import { UPDATE_CLIENT_PROFILE } from '@gql_mutation/client/profile/UpdateClientProfile'
import { useNavigation } from '@react-navigation/native'

//utils
import { isNotifedVar, isUserIdVar, isUserPhoneVar, localeVar } from '@utils/cache'

export const useUpdateClientProfile = () => {

    //global hooks
    const navigation = useNavigation()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [updateProfile] = useMutation(UPDATE_CLIENT_PROFILE)

    //handles
    const updateClientProfile = (name, image, avatar) => {
        updateProfile({
            variables: {
                phone: isUserPhoneVar(),
                name: name,
                avatar: image ? isUserIdVar() : avatar ? isUserIdVar() : '',
            },
            refetchQueries: ['ClientProfile'],
            onCompleted: () => {
                setTimeout(() => (isNotifedVar(locale.updated_notify),
                    navigation.goBack()), 2000)
            },
            onError: () => {
                isNotifedVar(locale.error_notify)
            }
        })
    }

    return {
        updateClientProfile
    }
}