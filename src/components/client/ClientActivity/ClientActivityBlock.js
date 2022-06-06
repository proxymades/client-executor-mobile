//core
import React, { useState } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

//utils
import { IMAGES_URI } from '@utils/uri'
import { blackColorVar, whiteColorVar, localeVar } from '@utils/cache'

//common conponents
import { ExtraModal } from '@common_components/Modals/ExtraModal'
import { ProfileData } from '@common_components/Profile/ProfileData'
import { ProfileMenu } from '@common_components/Profile/ProfileMenu'
import { ProfileRegisterDate } from '@common_components/Profile/ProfileRegisterDate'
import { WhiteButton } from '@common_components/Buttons/WhiteButton'
import { ProfileLineData } from '@common_components/Profile/ProfileLineData'

//colors
import { grayColor, lightgrayColor } from '@utils/colors'

export const ClientActivityBlock = ({ executor, order, offer, createdAt }) => {

    //global hooks
    const navigation = useNavigation()

    //states
    const [profileMenuShow, setProfileMenuShow] = useState(false)

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleLinkOrder = () => {
        navigation.push('ClientOrder', { title: order.header, orderId: order.id, fromRequest: true })
    }

    const handleLinkRequests = () => {
        navigation.push('ClientOrderRequests', { orderId: order.id })
    }

    const handleProfileMenuShow = () => {
        setProfileMenuShow(true)
    }

    return (

        <View style={styles.container}>

            <View style={styles.itemsContainer}>

                <View style={styles.items}>

                    <View style={styles.data}>

                        <View>

                            <Pressable onPress={handleProfileMenuShow}>
                                <ProfileLineData
                                    avatar={executor.avatar}
                                    name={executor.name}
                                    verified={executor.verified}
                                    size={35}
                                />
                            </Pressable>

                            <Pressable onPress={handleLinkOrder}>
                                <Text style={styles.actionText}>{locale.sendedRequest}</Text>
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

                <Text style={styles.createdAt}>{dayjs(createdAt).fromNow()}</Text>

                <View style={styles.offerContainer}>

                    <View>
                        <Text style={styles.offerText}>{locale.suggestedPrice} </Text>
                        <Text style={styles.offerPrice}>{offer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} {locale.tenge}</Text>
                    </View>

                    <WhiteButton handleAction={handleLinkRequests}>
                        <Text style={styles.buttonText}>{locale.toRequests}</Text>
                    </WhiteButton>

                </View>

            </View>

            <ExtraModal
                modalVisible={profileMenuShow}
                setModalVisible={setProfileMenuShow}
            >
                <ProfileData
                    name={executor.name}
                    verified={executor.verified}
                />

                <ProfileMenu
                    worksCount={executor.orderRequest.length}
                    ratingCount={5}
                    reviewsCount={77}
                    type='executor'
                />

                <ProfileRegisterDate createdAt={executor.createdAt} />

            </ExtraModal>

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
})