//core
import React, { useState, useEffect } from 'react'
import { View, Text, Image, Pressable, Linking, ActivityIndicator } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

//hooks
import { useWriteFeedbackClient } from '@hooks_mutation/executor/order/useWriteFeedbackClient'

//utils
import { IMAGES_URI } from '@utils/uri'
import { blackColorVar, whiteColorVar, localeVar } from '@utils/cache'

//common conponents
import { ExtraModal } from '@common_components/Modals/ExtraModal'
import { ProfileData } from '@common_components/Profile/ProfileData'
import { ProfileMenu } from '@common_components/Profile/ProfileMenu'
import { ProfileRegisterDate } from '@common_components/Profile/ProfileRegisterDate'
import { ProfileLineData } from '@common_components/Profile/ProfileLineData'
import { BlueButton } from '@common_components/Buttons/BlueButton'
import { WhiteButton } from '@common_components/Buttons/WhiteButton'
import { RatingMenuForm } from '@common_components/Modals/Forms/RatingMenuForm'

//colors
import { blueColor, grayColor, lightblueColor, lightgrayColor } from '@utils/colors'

export const ExecutorActivityBlock = ({
    client,
    order,
    offer,
    createdAt,
    isFinished
}) => {

    //global hooks
    const navigation = useNavigation()

    //states
    const [profileMenuShow, setProfileMenuShow] = useState(false)
    const [accepting, setAccepting] = useState(false)
    const [ratingClient, setRatingClient] = useState(false)
    const [formState, setFormState] = useState({
        rating: 0,
        message: '',
        phone: ''
    })

    //hooks
    const { writeFeedbackClient } = useWriteFeedbackClient(order.id, formState, setRatingClient, setAccepting)

    //constants
    const feddbackLength = client.feedbackClient.length !== 0 ? client.feedbackClient.length : 1
    const rating = client.feedbackClient.map(item => item.rating).reduce((prev, curr) => prev + curr, 0) / feddbackLength
    const reviews = client.feedbackClient.filter(el => el.message !== '').length

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
                    {accepting ?
                        <ActivityIndicator size='small' color={lightblueColor} />
                        : null
                    }
                </>
            ),
        })
    }, [navigation, accepting])

    useEffect(() => {
        accepting && writeFeedbackClient()
    }, [accepting])

    //handles
    const handleLinkOrder = () => {
        navigation.push('ExecutorOrder', { title: order.header, orderId: order.id })
    }

    const handleCall = async (phone) => {
        Linking.openURL(`tel:+7${phone}`)
    }

    const handleMessage = async (phone) => {
        Linking.openURL(`whatsapp://send?phone=7${phone}`)
    }

    const handleProfileMenuShow = () => {
        setProfileMenuShow(true)
    }

    const handleRateClient = () => {
        setAccepting(true)
    }

    const handleInputFormChange = (value, name) => {
        const list = { ...formState }
        list[name] = value
        setFormState(list)
    }

    return (

        <View style={styles.container}>

            <View style={styles.itemsContainer}>

                <View style={styles.items}>

                    <View style={styles.data}>

                        <View>

                            <Pressable onPress={handleProfileMenuShow}>
                                <ProfileLineData
                                    avatar={client.avatar}
                                    name={client.name}
                                    verified={client.verified}
                                    size={35}
                                />
                            </Pressable>

                            <Pressable onPress={handleLinkOrder}>
                                {isFinished ?
                                    <Text style={styles.actionFinishText}>{locale.finishRequest}</Text>
                                    :
                                    <Text style={styles.actionText}>{locale.acceptRequest}</Text>
                                }
                                <Text style={styles.orderText}>{order.header}</Text>
                            </Pressable>

                        </View>

                    </View>

                    {order.image ?
                        <Pressable onPress={handleLinkOrder}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: `${IMAGES_URI}${order.image}`,
                                }}
                            />
                        </Pressable>
                        : null
                    }

                </View>

                <View style={styles.offerContainer}>

                    <View>
                        <Text style={styles.offerText}>{locale.suggestedPrice} </Text>
                        <Text style={styles.offerPrice}>{offer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} {locale.tenge}</Text>
                    </View>

                    {isFinished &&
                        !client.feedbackClient.find(el => el.orderId === order.id) ?
                        <WhiteButton handleAction={() => setRatingClient(true)}>
                            <Text style={styles.buttonText}>{locale.rateClient}</Text>
                        </WhiteButton>
                        : null
                    }

                </View>

                {!isFinished ?
                    <View style={styles.clientButtons}>

                        <BlueButton handleAction={() => handleCall(client.phone)}>
                            <Text style={styles.clientButtonText}>{locale.toClientCall}</Text>
                        </BlueButton>

                        <BlueButton handleAction={() => handleMessage(client.phone)}>
                            <Text style={styles.clientButtonText}>{locale.toWhatsapp}</Text>
                        </BlueButton>

                    </View>
                    : null
                }

            </View>

            <ExtraModal
                modalVisible={profileMenuShow}
                setModalVisible={setProfileMenuShow}
            >
                <ProfileData
                    name={client.name}
                    verified={client.verified}
                />
                <ProfileMenu
                    ordersCount={client.order.length}
                    ratingCount={rating}
                    reviewsCount={reviews}
                    type='client'
                />
                <ProfileRegisterDate createdAt={client.createdAt} />
            </ExtraModal>

            <ExtraModal
                modalVisible={ratingClient}
                setModalVisible={setRatingClient}
            >
                <RatingMenuForm
                    setModalVisible={setRatingClient}
                    action={handleRateClient}
                    input={formState}
                    inputChange={handleInputFormChange}
                    phone={client.phone}
                    avatar={client.avatar}
                    name={client.name}
                    verified={client.verified}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={accepting}
                isEditing={true}
            />

        </View>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        width: '100%',
        paddingHorizontal: 16,
    },
    itemsContainer: {
        marginVertical: 20,
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    data: {
        flexDirection: 'row',
    },
    actionFinishText: {
        color: blueColor,
        marginTop: 5,
        fontSize: 14,
    },
    actionText: {
        color: lightgrayColor,
        marginTop: 5,
        fontSize: 13,
    },
    orderText: {
        color: grayColor,
        marginTop: 5,
        fontSize: 13,
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 10,
    },
    createdAt: {
        color: lightgrayColor,
        marginTop: 5,
        fontSize: 10,
    },
    offerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    offerText: {
        fontSize: 12,
        color: grayColor,
    },
    offerPrice: {
        fontSize: 14,
        color: blackColor,
        fontWeight: 'bold'
    },
    buttonText: {
        fontSize: 11,
        color: grayColor
    },
    clientButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    clientButtonText: {
        fontSize: 11,
        color: whiteColor,
        paddingHorizontal: 5,
    },
})