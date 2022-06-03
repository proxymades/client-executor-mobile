//core
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

//hooks
import { useExecutorOrder } from '@hooks_query/order/useExecutorOrder'
import { useCreateOrderRequest } from '@hooks_mutation/order/useCreateOrderRequest'
import { useCancelOrderRequest } from '@hooks_mutation/order/useCancelOrderRequest'

//common components
import { Loader } from '@components/Common/Loaders/Loader'
import { ExtraModal } from '@components/Common/Modals/ExtraModal'
import { OrderExecutorMenuForm } from '@components/Common/Modals/Forms/OrderExecutorMenuForm'
import { QuestionMenuForm } from '@components/Common/Modals/Forms/QuestionMenuForm'
import { OrderData } from '@components/Common/Order/OrderData'
import { ProfileData } from '@components/Common/Profile/ProfileData'
import { ProfileMenu } from '@components/Common/Profile/ProfileMenu'
import { ProfileRegisterDate } from '@components/Common/Profile/ProfileRegisterDate'
import { OfferPriceMenuForm } from '@components/Common/Modals/Forms/OfferPriceMenuForm'

//utils
import { blackColorVar, isUserTypeVar, localeVar, whiteColorVar } from '@utils/cache'

//icons
import { MenuIcon } from '@components/Common/Svg/Svg'

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

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //effects
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={handleOpenOrderMenu}
                >
                    {isUserTypeVar() === 'executor' ?
                        <>
                            {(sending || canceling) ?
                                <ActivityIndicator size='small' color={lightblueColor} />
                                :
                                <MenuIcon width={22} height={22} fill={blackColor} />
                            }
                        </>
                        : null
                    }
                </TouchableOpacity>
            ),
        })
    }, [navigation, whiteColor, blackColor, locale, canceling, sending])

    useEffect(() => {
        if (sending) {
            setExecutorMenuShow(false)
            createOrderRequest()
        }
    }, [sending])

    useEffect(() => {
        if (canceling) {
            setExecutorMenuShow(false)
            cancelOrderRequest()
        }
    }, [canceling])

    //handles
    const handleInputFormChange = (value, name) => {
        const list = { ...formState }
        list[name] = value
        setFormState(list)
    }

    const handleOpenOrderMenu = () => {
        isUserTypeVar() === 'executor' &&
            setExecutorMenuShow(true)
    }

    const handleCancelOrder = () => {
        if (isUserTypeVar() === 'executor') {
            setCanceling(true)
        }
    }

    const handleSendRequest = () => {
        setSending(true)
    }

    if (orderLoading) return <Loader />

    return (

        <OrderData orderData={orderData}>

            <ExtraModal
                modalVisible={executorMenuShow}
                setModalVisible={setExecutorMenuShow}
            >
                <OrderExecutorMenuForm
                    setModalVisible={setExecutorMenuShow}
                    setCancelMenuShow={setCancelMenuShow}
                    setProfileMenuShow={setProfileMenuShow}
                    setRequestMenuShow={setRequestMenuShow}
                    isExistRequest={orderData.orderRequest.length > 0}
                    isWorked={orderData.isWork || orderData.isReady}
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
                    ratingCount={5}
                    reviewsCount={77}
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
