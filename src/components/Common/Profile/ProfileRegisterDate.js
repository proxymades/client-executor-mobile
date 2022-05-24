//core
import React from 'react'
import { View, Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import dayjs from 'dayjs'

//utils
import { localeVar } from '@utils/cache'

//colors
import { grayColor } from '@utils/colors'

export const ProfileRegisterDate = ({ createdAt }) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //styles
    const styles = getStyles()

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{locale.registerDate} {dayjs(createdAt).format('DD.MM.YYYY')}</Text>
        </View>
    )
}

const getStyles = () => ({
    container: {
        position: 'absolute',
        bottom: 20,
    },
    text: {
        fontSize: 12,
        color: grayColor,
        textAlign: 'center',
        marginTop: 10,
    },
})