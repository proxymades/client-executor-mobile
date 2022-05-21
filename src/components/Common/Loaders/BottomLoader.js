//core
import React from 'react';
import { View, ActivityIndicator } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { whiteColorVar } from '@utils/cache'

//colors
import { lightblueColor } from '@utils/colors'

export const BottomLoader = () => {

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)

    //styles
    const styles = getStyles(whiteColor)

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={lightblueColor} />
        </View>
    )
}

const getStyles = (whiteColor) => ({
    container: {
        height: 70,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
    }
})