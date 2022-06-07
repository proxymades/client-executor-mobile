//core
import React from 'react'
import { View, Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, whiteColorVar } from '@utils/cache'

//colors
import { grayColor } from '@utils/colors'

export const EmptyPage = ({ text }) => {

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    return (

        <View style={styles.container}>

            <Text style={styles.text}>{text}</Text>

        </View>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        color: grayColor
    },
})