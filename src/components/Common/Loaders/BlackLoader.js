//core
import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, whiteColorVar } from '@utils/cache'

export const BlackLoader = ({ label }) => {

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    return (
        <View style={styles.container}>
            <View style={styles.containerWrap} />
            <ActivityIndicator size='large' color={whiteColor} />
            <Text style={styles.text}>{label}</Text>
        </View>
    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerWrap: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: blackColor,
        opacity: 0.2,
        position: 'absolute'
    },
    text: {
        color: whiteColor,
        fontSize: 14
    }
})