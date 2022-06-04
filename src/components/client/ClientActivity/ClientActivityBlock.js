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

//common components
import { Avatar } from '@common_components/Avatar/Avatar'

//icons
import { VerifiedIcon } from '@components/Common/Svg/Svg'

//colors
import { blueColor, grayColor, lightblueColor, lightgrayColor } from '@utils/colors'
import { ExtraModal } from '@components/Common/Modals/ExtraModal'
import { ProfileData } from '@components/Common/Profile/ProfileData'
import { ProfileMenu } from '@components/Common/Profile/ProfileMenu'
import { ProfileRegisterDate } from '@components/Common/Profile/ProfileRegisterDate'

export const ClientActivityBlock = ({ executor, order, createdAt }) => {

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

    const handleProfileMenuShow = () => {
        setProfileMenuShow(true)
    }

    return (

        <View style={styles.container}>

            <View style={styles.itemsContainer}>

                <View style={styles.items}>

                    <View style={styles.data}>

                        <Pressable onPress={handleProfileMenuShow}>
                            <Avatar size={35} avatar={executor.avatar} />
                        </Pressable>

                        <View>

                            <Pressable onPress={handleProfileMenuShow}>

                                <View style={styles.name}>

                                    <Text style={styles.nameText}>{executor.name}</Text>

                                    {executor.verified ?
                                        <VerifiedIcon width={12} height={12} fill={lightblueColor} />
                                        : null
                                    }

                                </View>

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
        marginVertical: 15,
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    data: {
        flexDirection: 'row',
    },
    name: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameText: {
        color: blackColor,
        marginHorizontal: 5,
        fontSize: 14,
    },
    actionText: {
        color: lightgrayColor,
        marginHorizontal: 5,
        fontSize: 12,
    },
    orderText: {
        color: grayColor,
        marginHorizontal: 5,
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
})