//core
import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, whiteColorVar } from '@utils/cache'

//common components
import { Counter } from '@common_components/Counter/Counter'

//colors
import { lightgrayColor } from '@utils/colors'

export const InputLine = ({
    inputChange,
    input,
    symbols,
    placeholder,
    label,
    isNumeric,
}) => {

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)
    const whiteColor = useReactiveVar(whiteColorVar)

    //styles
    const styles = getStyles(blackColor, whiteColor)

    return (

        <View style={styles.container}>

            {label ?
                <Text style={styles.label}>{label} *</Text>
                : null
            }
            <TextInput
                style={styles.input}
                onChangeText={inputChange}
                value={input}
                placeholder={placeholder}
                placeholderTextColor={lightgrayColor}
                maxLength={isNumeric ? 7 : symbols}
                keyboardType={isNumeric ? 'phone-pad' : 'default'}
            />
            {symbols ?
                <Counter counter={input.length} max={symbols} />
                : null
            }

        </View>

    )
}

const getStyles = (blackColor, whiteColor) => ({
    container: {
        width: '90%',
        marginVertical: 10,
        alignSelf: 'center',
    },
    label: {
        color: blackColor,
        fontSize: 14,
        marginTop: 15,
    },
    input: {
        width: '100%',
        height: 40,
        margin: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: lightgrayColor,
        padding: 7,
        color: blackColor,
    },
})