//core
import { useMutation, useReactiveVar } from '@apollo/client'

//gql
import { UPDATE_EXECUTOR_PROFILE } from '@gql_mutation/executor/UpdateExecutorProfile'
import { useNavigation } from '@react-navigation/native'

//utils
import { isNotifedVar, isUserIdVar, isUserPhoneVar, localeVar } from '@utils/cache'

export const useUpdateExecutorProfile = () => {

    //global hooks
    const navigation = useNavigation()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [updateProfile] = useMutation(UPDATE_EXECUTOR_PROFILE)

    //handles
    const updateExecutorProfile = (name, image, avatar) => {
        updateProfile({
            variables: {
                phone: isUserPhoneVar(),
                name: name,
                avatar: image ? isUserIdVar() : avatar ? isUserIdVar() : '',
            },
            refetchQueries: ['ExecutorProfile'],
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
        updateExecutorProfile
    }
}