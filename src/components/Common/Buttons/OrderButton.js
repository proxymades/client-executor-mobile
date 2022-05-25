//core
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { whiteColorVar } from '@utils/cache'

//colors
import { grayColor } from '@utils/colors'

export const OrderButton = ({ children, handleAction, isDisabled }) => {

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
        height: 80,
        borderRadius: 25,
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: whiteColor,
        shadowColor: grayColor,
        elevation: 9
    },
})