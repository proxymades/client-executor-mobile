//core
import React from 'react'
import { Text, View, Switch } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { lightengrayColorVar, localeVar } from '@utils/cache'

//colors
import { blueColor, grayColor, lightblueColor, lightgrayColor } from '@utils/colors'

export const SwitchLine = ({
    inputChange,
    input,
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const lightengrayColor = useReactiveVar(lightengrayColorVar)

    //styles
    const styles = getStyles()

    return (

        <View style={styles.container}>

            <View style={styles.switchContainer}>
                <View style={styles.switchText}>
                    {input ?
                        <Text style={styles.switchLabel}>{locale.urgentOrderYes}</Text>
                        : <Text style={styles.switchLabel}>{locale.urgentOrderNo}</Text>
                    }
                </View>
                <Switch
                    trackColor={{ false: lightgrayColor, true: lightblueColor }}
                    thumbColor={input ? blueColor : lightengrayColor}
                    ios_backgroundColor={grayColor}
                    onValueChange={inputChange}
                    value={input}
                />

            </View>

        </View>

    )
}

const getStyles = () => ({
    container: {
        width: '90%',
        marginVertical: 10,
        alignSelf: 'center',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        marginTop: 10
    },
    switchText: {
        flexDirection: 'row',
        color: blueColor
    },
    switchLabel: {
        color: blueColor,
        fontSize: 14,
    },
})