//core
import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar } from '@utils/cache'

//common components
import { Counter } from '@common_components/Counter/Counter'

//colors
import { lightblueColor, lightgrayColor } from '@utils/colors'

export const InputMultiline = ({
    inputChange,
    input,
    placeholder,
    label,
    symbols
}) => {

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    return (

        <View style={styles.container}>

            <Text style={styles.label}>{label} *</Text>
            <TextInput
                style={styles.multiline}
                multiline
                textAlignVertical='top'
                numberOfLines={5}
                onChangeText={inputChange}
                value={input}
                placeholder={placeholder}
                placeholderTextColor={lightgrayColor}
                maxLength={symbols}
            />
            <Counter counter={input.length} max={symbols} />

        </View>

    )
}

const getStyles = (blackColor) => ({
    container: {
        width: '90%',
        marginVertical: 10,
        alignSelf: 'center',
    },
    multiline: {
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: lightgrayColor,
        padding: 7,
        color: blackColor
    },
    label: {
        color: blackColor,
        fontSize: 14,
        marginTop: 15
    },
})