//core
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ActivityIndicator, Text, View } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

//hooks
import { useExecutorOrder } from '@hooks_query/executor/order/useExecutorOrder'
import { useCreateOrderRequest } from '@hooks_mutation/executor/order/useCreateOrderRequest'
import { useCancelOrderRequest } from '@hooks_mutation/executor/order/useCancelOrderRequest'

//common components
import { Loader } from '@common_components/Loaders/Loader'
import { ExtraModal } from '@common_components/Modals/ExtraModal'
import { OrderExecutorMenuForm } from '@common_components/Modals/Forms/OrderExecutorMenuForm'
import { QuestionMenuForm } from '@common_components/Modals/Forms/QuestionMenuForm'
import { OrderData } from '@common_components/Order/OrderData'
import { ProfileData } from '@common_components/Profile/ProfileData'
import { ProfileMenu } from '@common_components/Profile/ProfileMenu'
import { ProfileRegisterDate } from '@common_components/Profile/ProfileRegisterDate'
import { OfferPriceMenuForm } from '@common_components/Modals/Forms/OfferPriceMenuForm'
import { BlueButton } from '@common_components/Buttons/BlueButton'

//utils
import { blackColorVar, isNotifedVar, localeVar, whiteColorVar } from '@utils/cache'

//icons
import { MenuIcon } from '@common_components/Svg/Svg'

//colors
import { lightblueColor } from '@utils/colors'

export const ExecutorOrder = ({ route }) => {

    //global hooks
    const navigation = useNavigation()

    //states
    const [formState, setFormState] = useState({
        offer: '',
    })
    const [canceling, setCanceling] = useState(false)
    const [sending, setSending] = useState(false)

    const [executorMenuShow, setExecutorMenuShow] = useState(false)
    const [cancelMenuShow, setCancelMenuShow] = useState(false)
    const [profileMenuShow, setProfileMenuShow] = useState(false)
    const [requestMenuShow, setRequestMenuShow] = useState(false)

    //hooks
    const { orderLoading, orderData } = useExecutorOrder(route.params.orderId)
    const { createOrderRequest } = useCreateOrderRequest(route.params.orderId, formState.offer)
    const { cancelOrderRequest } = useCancelOrderRequest(route.params.orderId)

    //constants
    const feddbackLength = orderData?.client.feedbackClient.length !== 0 ? orderData?.client.feedbackClient.length : 1
    const rating = orderData?.client.feedbackClient.map(item => item.rating).reduce((prev, curr) => prev + curr, 0) / feddbackLength
    const reviews = orderData?.client.feedbackClient.filter(el => el.message !== '').length

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //effects
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={handleOpenOrderMenu}
                >
                    {(sending || canceling) ?
                        <ActivityIndicator size='small' color={lightblueColor} />
                        :
                        <MenuIcon width={22} height={22} fill={blackColor} />
                    }
                </TouchableOpacity>
            ),
        })
    }, [navigation, whiteColor, blackColor, locale, canceling, sending])

    useEffect(() => {
        if (sending) {
            setExecutorMenuShow(false)
            createOrderRequest().catch(error => {
                isNotifedVar(error.message)
                setSending(false)
            })
        }
    }, [sending, createOrderRequest])

    useEffect(() => {
        if (canceling) {
            setExecutorMenuShow(false)
            cancelOrderRequest().catch(error => {
                isNotifedVar(error.message)
                setCanceling(false)
            })
        }
    }, [canceling, cancelOrderRequest])

    //handles
    const handleInputFormChange = (value, name) => {
        const list = { ...formState }
        list[name] = value
        setFormState(list)
    }

    const handleOpenOrderMenu = () => {
        setExecutorMenuShow(true)
    }

    const handleCancelOrder = () => {
        setCanceling(true)
    }

    const handleSendRequest = () => {
        setSending(true)
    }

    const handleOpenRequestForm = () => {
        if (orderData.isWork || orderData.isReady) {
            setExecutorMenuShow(false)
            isNotifedVar(locale.orderUAccepted_notify)
        } else {
            setRequestMenuShow(true)
        }
    }

    const handleCancelMenuShow = () => {
        setCancelMenuShow(true)
    }

    if (orderLoading) return <Loader />

    return (

        <OrderData orderData={orderData}>

            {orderData.orderRequest.length === 0 ?
                <View style={styles.offerContainer}>
                    <BlueButton handleAction={handleOpenRequestForm} isDisabled={sending || canceling}>
                        <Text style={styles.offerText}>
                            {locale.offerPrice}
                        </Text>
                    </BlueButton>
                </View>
                :
                !orderData.isWork && !orderData.isReady ?
                    <View style={styles.offerContainer}>
                        <BlueButton handleAction={handleCancelMenuShow} isDisabled={sending || canceling}>
                            <Text style={styles.offerText}>
                                {locale.cancel}
                            </Text>
                        </BlueButton>
                    </View>
                    : null
            }

            <ExtraModal
                modalVisible={executorMenuShow}
                setModalVisible={setExecutorMenuShow}
            >
                <OrderExecutorMenuForm
                    setModalVisible={setExecutorMenuShow}
                    setProfileMenuShow={setProfileMenuShow}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={requestMenuShow}
                setModalVisible={setRequestMenuShow}
                isSubmenu={true}
            >
                <OfferPriceMenuForm
                    setModalVisible={setRequestMenuShow}
                    label={locale.offerPrice}
                    action={handleSendRequest}
                    input={formState.offer}
                    inputChange={e => handleInputFormChange(e, 'offer')}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={cancelMenuShow}
                setModalVisible={setCancelMenuShow}
                isSubmenu={true}
            >
                <QuestionMenuForm
                    setModalVisible={setCancelMenuShow}
                    label={locale.confirmRequestCanceling}
                    action={handleCancelOrder}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={profileMenuShow}
                setModalVisible={setProfileMenuShow}
                isSubmenu={true}
            >
                <ProfileData
                    name={orderData.client.name}
                    verified={orderData.client.verified}
                />

                <ProfileMenu
                    ordersCount={orderData.client.order.length}
                    ratingCount={rating}
                    reviewsCount={reviews}
                    type='client'
                />

                <ProfileRegisterDate createdAt={orderData.client.createdAt} />

            </ExtraModal>

            <ExtraModal
                modalVisible={sending}
                isEditing={true}
            />

            <ExtraModal
                modalVisible={canceling}
                isEditing={true}
            />

        </OrderData>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    offerContainer: {
        width: '50%',
        alignSelf: 'center',
        marginTop: 30,
    },
    offerText: {
        color: whiteColor,
        fontSize: 14
    },
})