//core
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { whiteColorVar } from '@utils/cache'

//colors
import { grayColor } from '@utils/colors'

export const WhiteButton = ({ children, handleAction, isDisabled }) => {

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)

    //styles
    const styles = getStyles(whiteColor)

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handleAction}
            disabled={isDisabled ? true : false}
        >
            {children}
        </TouchableOpacity>
    )
}

const getStyles = (whiteColor) => ({
    button: {
        height: 40,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: whiteColor,
        shadowColor: grayColor,
        shadowOpacity: 0.2,
        elevation: 9
    },
})