//core
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { blackColorVar, localeVar } from '@utils/cache'

//common components
import { WhiteButton } from '@components/Common/Buttons/WhiteButton'
import { InputLine } from '@components/Common/Inputs/InputLine'

//colors
import { lightgrayColor } from '@utils/colors'

export const OfferPriceMenuForm = ({
    setModalVisible,
    action,
    label,
    input,
    inputChange
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //handles
    const handleAction = () => {
        setModalVisible(false)
        action()
    }
    console.log(input);
    return (

        <View style={styles.container}>

            <Text style={styles.label}>{label}</Text>


            <View style={styles.items}>

                <InputLine
                    inputChange={inputChange}
                    input={input}
                    placeholder={`${locale.enterAmount_placeholder} ${locale.tenge}`}
                    isNumeric={true}
                />

                <WhiteButton
                    handleAction={handleAction}
                    isDisabled={input === ''}
                >
                    <Text style={[styles.text, input === '' && { color: lightgrayColor }]}>{locale.send}</Text>
                </WhiteButton>

            </View>

        </View>
    )
}

const getStyles = (blackColor) => ({
    container: {
        width: '100%',
        marginVertical: 30
    },
    items: {
        justifyContent: 'space-around',
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    label: {
        textAlign: 'center',
        color: blackColor,
        fontSize: 14,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 30,
        color: blackColor
    },
})
