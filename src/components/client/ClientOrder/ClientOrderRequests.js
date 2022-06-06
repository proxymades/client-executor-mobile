//core
import React, { useState } from 'react'
import { View, Text, FlatList, RefreshControl, Linking } from 'react-native'
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

//components
import { ClientOrderRequestsBlock } from './ClientOrderRequestsBlock'

//common components
import { Loader } from '@common_components/Loaders/Loader'
import { WhiteButton } from '@components/Common/Buttons/WhiteButton'

//icons
import { AcceptIcon, CancelIcon } from '@components/Common/Svg/Svg'

//colors
import { blueColor, grayColor, lightblueColor, lightgrayColor, lightredColor } from '@utils/colors'

const renderClientOrderRequestBlock = (item, acceptOrderRequest) =>
    <ClientOrderRequestsBlock item={item} acceptOrderRequest={acceptOrderRequest} />

export const ClientOrderRequests = ({ navigation, route }) => {

    //states
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        clientOrderRequestsLoading,
        clientOrderRequestsData,
        clientOrderRequestsRefetch
    } = useClientOrderRequests(route.params.orderId)

    const {
        acceptOrderRequest
    } = useAcceptOrderRequest(route.params.orderId, clientOrderRequestsData?.filter(el => el.accepted).map(el => el.id)[0])

    const { repulseOrderRequest } = useRepulseOrderRequest(route.params.orderId)

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //effects

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

    if (clientOrderRequestsLoading) return <Loader />

    return (

        <View style={styles.container}>

            {clientOrderRequestsData.length > 0 ?

                <>

                    {clientOrderRequestsData.find(el => el.accepted) ?
                        <>
                            <Text style={styles.important}>{locale.deleteOrderImportant}</Text>

                            <View style={styles.orderButtons}>

                                <WhiteButton>
                                    <View style={styles.buttonItems}>
                                        <AcceptIcon width={25} height={25} fill={lightblueColor} />
                                        <Text style={styles.buttonText}>{locale.orderCompleted}</Text>
                                    </View>
                                </WhiteButton>

                                <WhiteButton>
                                    <View style={styles.buttonItems}>
                                        <CancelIcon width={15} height={15} fill={lightredColor} />
                                        <Text style={styles.buttonText}>{locale.orderNotCompleted}</Text>
                                    </View>
                                </WhiteButton>

                            </View>

                        </>
                        : null}

                    {clientOrderRequestsData.filter(el => el.accepted).map(el =>
                        <View key={el.id}>

                            <Text style={styles.text}>{locale.requestAccepted}</Text>

                            <ClientOrderRequestsBlock
                                item={el}
                                repulseOrderRequest={repulseOrderRequest}
                            />

                            <View style={styles.executorButtons}>

                                <WhiteButton handleAction={() => handleCall(el.executor.phone)}>
                                    <Text style={styles.executorButtonText}>{locale.toExecutorCall}</Text>
                                </WhiteButton>

                                <WhiteButton handleAction={() => handleMessage(el.executor.phone)}>
                                    <Text style={styles.executorButtonText}>{locale.toWhatsapp}</Text>
                                </WhiteButton>

                            </View>

                        </View>
                    )}

                    {clientOrderRequestsData.filter(el => el.accepted === false).length > 0 ?
                        <Text style={styles.text}>{locale.requests}</Text>
                        : null
                    }


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


                </>

                :

                <Text style={styles.text}>{locale.requestsEmpty}</Text>

            }
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
        color: grayColor,
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 14,
        color: grayColor,
        marginVertical: 10,
    },
})