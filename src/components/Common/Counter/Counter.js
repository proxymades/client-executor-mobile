//core
import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

//colors
import { lightgrayColor } from '@utils/colors'

export const Counter = ({ counter, max }) => {

    //states
    const [counterState, setCounterState] = useState(max)

    //styles
    const styles = getStyles()

    //effects
    useEffect(() => {
        setCounterState(max - counter)
    })

    return (
        <View style={styles.wrap}>
            <Text style={styles.counter}>
                {counter} / {counterState}
            </Text>
        </View>

    )
}

const getStyles = () => ({
    wrap: {
        alignItems: 'flex-end',
    },
    counter: {
        color: lightgrayColor,
        fontSize: 12
    },
})
