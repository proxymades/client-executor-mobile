//core
import React from 'react'
import { View, Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import dayjs from 'dayjs'

//common components
import { ProfileLineData } from '@common_components/Profile/ProfileLineData'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//colors
import { grayColor, lightgrayColor } from '@utils/colors'

export const Feedback = React.memo(({
    avatar,
    name,
    verified,
    message,
    rating,
    createdAt,
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    return (

        <View style={styles.container}>

            <ProfileLineData
                avatar={avatar}
                name={name}
                verified={verified}
                size={25}
            />

            <Text style={styles.review}>{message}</Text>

            <Text style={styles.rating}>{locale.rating} - {rating}</Text>

            <Text style={styles.createdAt}>{dayjs(createdAt).format('DD.MM.YYYY')}</Text>

        </View>

    )
})

const getStyles = (whiteColor, blackColor) => ({
    container: {
        margin: 10,
        padding: 10,
        marginVertical: 20,
        borderRadius: 20,
        borderWidth: .5,
        borderColor: lightgrayColor
    },
    createdAt: {
        color: lightgrayColor,
        fontSize: 12,
        marginTop: 10
    },
    review: {
        color: blackColor,
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 10,
    },
    rating: {
        color: grayColor,
        fontSize: 12,
        marginTop: 5,
    },
})