//core
import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, RefreshControl, Linking, ActivityIndicator } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import {
    blackColorVar,
    localeVar,
    whiteColorVar
} from '@utils/cache'

//hooks
import { useClientOrderRequests } from '@hooks_query/client/order/useClientOrderRequests'
import { useAcceptOrderRequest } from '@hooks_mutation/client/order/useAcceptOrderRequest'
import { useRepulseOrderRequest } from '@hooks_mutation/client/order/useRepulseOrderRequest'
import { useAcceptOrderWork } from '@hooks_mutation/client/order/useAcceptOrderWork'
import { useRepulseOrderWork } from '@hooks_mutation/client/order/useRepulseOrderWork'

//components
import { ClientOrderRequestsBlock } from './ClientOrderRequestsBlock'

//common components
import { Loader } from '@common_components/Loaders/Loader'
import { WhiteButton } from '@common_components/Buttons/WhiteButton'
import { BlueButton } from '@common_components/Buttons/BlueButton'
import { ExtraModal } from '@common_components/Modals/ExtraModal'
import { RatingMenuForm } from '@common_components/Modals/Forms/RatingMenuForm'

//icons
import { AcceptIcon, CancelIcon } from '@common_components/Svg/Svg'

//colors
import { blueColor, grayColor, lightblueColor, lightgrayColor, lightredColor } from '@utils/colors'


const renderClientOrderRequestBlock = (item, acceptOrderRequest) =>
    <ClientOrderRequestsBlock item={item} acceptOrderRequest={acceptOrderRequest} />

export const ClientOrderRequests = ({ navigation, route }) => {

    //states
    const [refreshing, setRefreshing] = useState(false)
    const [rating, setRating] = useState(false)
    const [accepting, setAccepting] = useState(false)
    const [badRating, setBadRating] = useState(false)
    const [repulsing, setRepulsing] = useState(false)
    const [formState, setFormState] = useState({
        rating: 0,
        message: '',
        executorPhone: ''
    })

    //hooks
    const {
        clientOrderRequestsLoading,
        clientOrderRequestsData,
        clientOrderRequestsRefetch,
        acceptedRequestId,
        isFinished
    } = useClientOrderRequests(route.params.orderId)

    const { acceptOrderRequest } = useAcceptOrderRequest(route.params.orderId, acceptedRequestId)
    const { repulseOrderRequest } = useRepulseOrderRequest(route.params.orderId)
    const { acceptOrderWork } = useAcceptOrderWork(route.params.orderId, acceptedRequestId, formState)
    const { repulseOrderWork } = useRepulseOrderWork(route.params.orderId, acceptedRequestId, formState)

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
                <>
                    {(accepting || repulsing) ?
                        <ActivityIndicator size='small' color={lightblueColor} />
                        : null
                    }
                </>
            ),
        })
    }, [navigation, accepting, repulsing])

    useEffect(() => {
        accepting && acceptOrderWork()
    }, [accepting])

    useEffect(() => {
        repulsing && repulseOrderWork()
    }, [repulsing])

    //handles
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            clientOrderRequestsRefetch()
            setRefreshing(false)
        }, 2000)
    }

    const handleCall = async (phone) => {
        Linking.openURL(`tel:+7${phone}`)
    }

    const handleMessage = async (phone) => {
        Linking.openURL(`whatsapp://send?phone=7${phone}`)
    }

    const handleAcceptOrder = () => {
        setAccepting(true)
    }

    const handleRepulseOrder = () => {
        setRepulsing(true)
    }

    const handleInputFormChange = (value, name) => {
        const list = { ...formState }
        list[name] = value
        setFormState(list)
    }

    if (clientOrderRequestsLoading) return <Loader />

    return (

        <View style={styles.container}>

            {clientOrderRequestsData.length > 0 ?

                <>

                    {!isFinished &&
                        clientOrderRequestsData.find(el => el.accepted) ?
                        <>
                            <Text style={styles.important}>{locale.deleteOrderImportant}</Text>

                            <View style={styles.orderButtons}>

                                <WhiteButton handleAction={() => setRating(true)}>
                                    <View style={styles.buttonItems}>
                                        <AcceptIcon width={25} height={25} fill={lightblueColor} />
                                        <Text style={styles.buttonText}>{locale.orderCompleted}</Text>
                                    </View>
                                </WhiteButton>

                                <WhiteButton handleAction={() => setBadRating(true)}>
                                    <View style={styles.buttonItems}>
                                        <CancelIcon width={15} height={15} fill={lightredColor} />
                                        <Text style={styles.buttonText}>{locale.orderNotCompleted}</Text>
                                    </View>
                                </WhiteButton>

                            </View>

                        </>
                        : null
                    }

                    {clientOrderRequestsData.filter(el => el.accepted).map(el =>
                        <View key={el.id}>

                            {!isFinished ?
                                <Text style={styles.text}>{locale.requestAccepted}</Text>
                                :
                                <Text style={styles.text}>{locale.finishedWork}</Text>
                            }

                            <ClientOrderRequestsBlock
                                item={el}
                                repulseOrderRequest={repulseOrderRequest}
                                isFinished={isFinished}
                            />

                            {!isFinished ?
                                <View style={styles.executorButtons}>

                                    <BlueButton handleAction={() => handleCall(el.executor.phone)}>
                                        <Text style={styles.executorButtonText}>{locale.toExecutorCall}</Text>
                                    </BlueButton>

                                    <BlueButton handleAction={() => handleMessage(el.executor.phone)}>
                                        <Text style={styles.executorButtonText}>{locale.toWhatsapp}</Text>
                                    </BlueButton>

                                </View>
                                : null
                            }

                        </View>
                    )}

                    {!isFinished &&
                        clientOrderRequestsData.filter(el => el.accepted === false).length > 0 ?
                        <Text style={styles.text}>{locale.requests}</Text>
                        : null
                    }

                    {!isFinished ?
                        <FlatList
                            data={clientOrderRequestsData}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => !item.accepted && renderClientOrderRequestBlock(item, acceptOrderRequest)}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={handleRefresh}
                                    colors={[blueColor]}
                                    progressBackgroundColor={whiteColor}
                                />
                            }
                        />
                        : null
                    }

                </>

                :

                <Text style={styles.text}>{locale.requestsEmpty}</Text>

            }

            <ExtraModal
                modalVisible={rating}
                setModalVisible={setRating}
            >
                <RatingMenuForm
                    setModalVisible={setRating}
                    action={handleAcceptOrder}
                    input={formState}
                    inputChange={handleInputFormChange}
                    requestData={clientOrderRequestsData.find(el => el.accepted)}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={badRating}
                setModalVisible={setBadRating}
            >
                <RatingMenuForm
                    setModalVisible={setBadRating}
                    action={handleRepulseOrder}
                    input={formState}
                    inputChange={handleInputFormChange}
                    requestData={clientOrderRequestsData.find(el => el.accepted)}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={accepting || repulsing}
                isEditing={true}
            />

        </View>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingBottom: 80,
    },
    important: {
        fontSize: 13,
        color: lightgrayColor,
        fontStyle: 'italic'
    },
    orderButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    buttonItems: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7
    },
    buttonText: {
        fontSize: 12,
        color: blackColor,
        marginLeft: 5
    },
    executorButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    executorButtonText: {
        fontSize: 11,
        color: whiteColor,
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 14,
        color: grayColor,
        marginVertical: 10,
    },

})