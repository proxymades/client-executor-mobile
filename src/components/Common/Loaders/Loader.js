//core
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { whiteColorVar } from '@utils/cache'

//colors
import { lightblueColor } from '@utils/colors'

export const Loader = ({ loadingData }) => {

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)

    //styles
    const styles = getStyles(whiteColor)

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={lightblueColor} />
            {loadingData ?
                <Text style={styles.text}>{loadingData}</Text>
                : null
            }
        </View>
    )
}

const getStyles = (whiteColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    text: {
        color: lightblueColor,
        fontSize: 12,
        marginTop: 10
    }
})