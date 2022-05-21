//core
import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

//utils
import { blackColorVar, isNotifedVar, whiteColorVar } from '@utils/cache'

export const Notify = () => {

    //hooks
    const insets = useSafeAreaInsets()
    const isNotifed = useReactiveVar(isNotifedVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor, insets)

    if (!isNotifed) {
        return null
    }

    return (
        <>
            <View style={styles.wrap}>
                <Text style={styles.text}>{isNotifedVar()}</Text>
            </View>
        </>
    )
}

const getStyles = (whiteColor, blackColor, insets) => ({
    wrap: {
        width: '94%',
        height: 60,
        marginTop: insets.top,
        position: 'absolute',
        marginHorizontal: '3%',
        top: 10,
        backgroundColor: whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: blackColor,
        elevation: 9,
        borderRadius: 10,
        opacity: 0.98
    },
    text: {
        color: blackColor
    }
})
