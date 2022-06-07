//core
import React, { useState, useEffect } from 'react'
import { View, Text, Switch, ActivityIndicator, Pressable } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import {
    blackColorVar,
    lightengrayColorVar,
    localeVar,
    whiteColorVar
} from '@utils/cache'

//common components
import { ProfileLineData } from '@components/Common/Profile/ProfileLineData'

//colors
import { blueColor, grayColor, lightblueColor, lightgrayColor } from '@utils/colors'
import { ExtraModal } from '@components/Common/Modals/ExtraModal'
import { ProfileData } from '@components/Common/Profile/ProfileData'
import { ProfileMenu } from '@components/Common/Profile/ProfileMenu'
import { ProfileRegisterDate } from '@components/Common/Profile/ProfileRegisterDate'

export const ClientOrderRequestsBlock = ({
    item,
    acceptOrderRequest,
    repulseOrderRequest,
    isFinished
}) => {

    //states
    const [profileMenuShow, setProfileMenuShow] = useState(false)
    const [formState, setFormState] = useState({
        accepted: item.accepted
    })
    const [accepting, setAccepting] = useState(false)
    const [repulsing, setRepulsing] = useState(false)

    //constants
    const feddbackLength = item.executor.feedbackExecutor.length !== 0 ? item.executor.feedbackExecutor.length : 1
    const rating = item.executor.feedbackExecutor.map(item => item.rating).reduce((prev, curr) => prev + curr, 0) / feddbackLength
    const reviews = item.executor.feedbackExecutor.filter(el => el.message !== '').length

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)
    const lightengrayColor = useReactiveVar(lightengrayColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //effects
    useEffect(() => {
        let acceptingTimer
        if (accepting) {
            acceptingTimer = setTimeout(() => {
                acceptOrderRequest(item.id)
                setAccepting(false)
            }, 2000)
        }
        return () => clearTimeout(acceptingTimer)
    }, [accepting])

    useEffect(() => {
        let repulsingTimer
        if (repulsing) {
            repulsingTimer = setTimeout(() => {
                repulseOrderRequest(item.id)
                setRepulsing(false)
            }, 2000)
        }
        return () => clearTimeout(repulsingTimer)
    }, [repulsing])

    const handleInputFormChange = (value, name) => {
        const list = { ...formState }
        list[name] = value
        setFormState(list)
        value ? setAccepting(true) : setRepulsing(true)
    }

    const handleProfileMenuShow = () => {
        setProfileMenuShow(true)
    }

    return (

        <View style={styles.request}>

            <View style={styles.requestData}>

                <Pressable onPress={handleProfileMenuShow}>
                    <ProfileLineData
                        avatar={item.executor.avatar}
                        name={item.executor.name}
                        verified={item.executor.verified}
                        size={35}
                    />
                </Pressable>
                <Text style={styles.requestOffer}>{item.offer} {locale.tenge}</Text>

            </View>

            {!isFinished ?
                <>
                    {(accepting || repulsing) ?
                        <ActivityIndicator size='small' color={lightblueColor} />
                        :
                        <Switch
                            trackColor={{ false: lightgrayColor, true: lightblueColor }}
                            thumbColor={formState.accepted ? blueColor : lightengrayColor}
                            ios_backgroundColor={grayColor}
                            onValueChange={e => handleInputFormChange(e, 'accepted')}
                            value={formState.accepted}
                        />
                    }
                </>
                : null
            }

            <ExtraModal
                modalVisible={profileMenuShow}
                setModalVisible={setProfileMenuShow}
            >
                <ProfileData
                    name={item.executor.name}
                    verified={item.executor.verified}
                />

                <ProfileMenu
                    worksCount={item.executor.orderRequest.length}
                    ratingCount={rating}
                    reviewsCount={reviews}
                    type='executor'
                />

                <ProfileRegisterDate createdAt={item.executor.createdAt} />

            </ExtraModal>

        </View>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    request: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    requestData: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    requestOffer: {
        fontSize: 16,
        color: blackColor,
        fontWeight: 'bold',
    },
})