//core
import { useMutation, useReactiveVar } from '@apollo/client'
import cuid from 'cuid'

//gql
import { WRITE_FEEDBACK_CLIENT } from '@gql_mutation/executor/order/WriteFeedbackClient'

//utils
import { isNotifedVar, localeVar } from '@utils/cache'

export const useWriteFeedbackClient = (orderId, formState, setRatingClient, setAccepting) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //mutations
    const [writeFeedbackClient] = useMutation(WRITE_FEEDBACK_CLIENT, {
        variables: {
            id: cuid(),
            rating: formState.rating,
            message: formState.message,
            toUser: formState.phone,
            orderId: orderId,
        },
        refetchQueries: ['ExecutorActivity'],
        onCompleted: (data) => {
            setTimeout(() => {
                setRatingClient(false)
                setAccepting(false)
                {
                    data.writeFeedbackClient ?
                        isNotifedVar(locale.reviewAdded_notify)
                        :
                        isNotifedVar(locale.feedbackExist_notify)
                }
            }, 2000)
        }
    })

    return { writeFeedbackClient }
}