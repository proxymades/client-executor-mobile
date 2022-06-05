//core
import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ActivityIndicator, View } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

//hooks
import { useClientOrder } from '@hooks_query/client/order/useClientOrder'
import { useDeleteOrder } from '@hooks_mutation/client/order/useDeleteOrder'

//common components
import { Loader } from '@components/Common/Loaders/Loader'
import { ExtraModal } from '@components/Common/Modals/ExtraModal'
import { OrderClientMenuForm } from '@components/Common/Modals/Forms/OrderClientMenuForm'
import { QuestionMenuForm } from '@components/Common/Modals/Forms/QuestionMenuForm'
import { OrderData } from '@components/Common/Order/OrderData'

//utils
import { blackColorVar, isUserTypeVar, localeVar, whiteColorVar } from '@utils/cache'

//icons
import { MenuIcon } from '@components/Common/Svg/Svg'

//colors
import { lightblueColor, lightredColor } from '@utils/colors'

export const ClientOrder = ({ route }) => {

    //global hooks
    const navigation = useNavigation()

    //states
    const [clientMenuShow, setClientMenuShow] = useState(false)
    const [deleteMenuShow, setDeleteMenuShow] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [newRequests, setNewRequests] = useState(true)

    //hooks
    const { orderLoading, orderData } = useClientOrder(route.params.orderId)
    const { deleteOrder } = useDeleteOrder(route.params.orderId)

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
                    {isUserTypeVar() === 'client' ?
                        <>
                            {deleting ?
                                <ActivityIndicator size='small' color={lightblueColor} />
                                :
                                <View style={{ position: 'relative' }}>
                                    <MenuIcon width={22} height={22} fill={blackColor} />
                                    {route.params.fromRequest &&
                                        newRequests ?
                                        <View style={{
                                            position: 'absolute',
                                            width: 10,
                                            height: 10,
                                            backgroundColor: lightredColor,
                                            right: -10,
                                            top: -5,
                                            borderRadius: 10
                                        }} />
                                        : null
                                    }
                                </View>
                            }
                        </>
                        :
                        null
                    }
                </TouchableOpacity>
            ),
        })
    }, [navigation, route, whiteColor, blackColor, locale, deleting, newRequests])

    //handles
    const handleOpenOrderMenu = () => {
        isUserTypeVar() === 'client' &&
            setClientMenuShow(true)
    }

    const handleDeleteOrder = () => {
        if (isUserTypeVar() === 'client') {
            setDeleting(true)
            deleteOrder()
            setClientMenuShow(false)
        }
    }

    const handleEditOrder = () => {
        setClientMenuShow(false)
        navigation.push('EditOrder', { orderId: route.params.orderId })
    }

    const handleLinkRequests = () => {
        navigation.push('ClientOrderRequests', { orderId: route.params.orderId })
    }

    if (orderLoading) return <Loader />

    return (

        <OrderData orderData={orderData}>

            <ExtraModal
                modalVisible={clientMenuShow}
                setModalVisible={setClientMenuShow}
            >
                <OrderClientMenuForm
                    setModalVisible={setClientMenuShow}
                    setDeleteMenuShow={setDeleteMenuShow}
                    editOrder={handleEditOrder}
                    linkRequests={handleLinkRequests}
                    newRequests={route.params.fromRequest && newRequests}
                    setNewRequests={setNewRequests}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={deleteMenuShow}
                setModalVisible={setDeleteMenuShow}
                isSubmenu={true}
            >
                <QuestionMenuForm
                    setModalVisible={setDeleteMenuShow}
                    label={locale.confirmOrderDeletion}
                    action={handleDeleteOrder}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={deleting}
                isEditing={true}
            />

        </OrderData>

    )
}