//core
import React from 'react'
import { TouchableOpacity } from 'react-native'

//colors
import { blueColor, grayColor } from '@utils/colors'

export const BlueButton = ({ children, handleAction, isDisabled }) => {

    //styles
    const styles = getStyles()

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

const getStyles = () => ({
    button: {
        height: 40,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: blueColor,
        shadowColor: grayColor,
        shadowOpacity: 0.2,
        elevation: 9
    },
})