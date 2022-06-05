//core
import React, { useState, useEffect } from 'react'
import { View, Text, Switch, ActivityIndicator } from 'react-native'
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

export const ClientOrderRequestsBlock = ({
    item,
    acceptOrderRequest,
    repulseOrderRequest,
}) => {

    //states
    const [formState, setFormState] = useState({
        accepted: item.accepted
    })
    const [accepting, setAccepting] = useState(false)
    const [repulsing, setRepulsing] = useState(false)

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

    return (

        <View style={styles.request}>

            <View style={styles.requestData}>

                <ProfileLineData
                    avatar={item.executor.avatar}
                    name={item.executor.name}
                    verified={item.executor.verified}
                    size={35}
                />

                <Text style={styles.requestOffer}>{item.offer} {locale.tenge}</Text>

            </View>

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