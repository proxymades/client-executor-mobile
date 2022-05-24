//core
import React from 'react'
import { Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { localeVar } from '@utils/cache'

//colors
import { grayColor } from '@utils/colors'

export const ProfilePhone = ({ phoneNumber }) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //styles
    const styles = getStyles()

    return (
        <>
            <Text style={styles.phone}>{locale.yourRegNumber}</Text>
            <Text style={styles.phone}>+7{phoneNumber}</Text>
        </>
    )
}

const getStyles = () => ({
    phone: {
        color: grayColor,
        fontSize: 14,
    },
})