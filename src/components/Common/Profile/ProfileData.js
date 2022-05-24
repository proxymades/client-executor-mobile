//core
import React from 'react'
import { View, Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar } from '@utils/cache'

//icons
import { VerifiedIcon } from '../Svg/Svg'

//colors
import { lightblueColor } from '@utils/colors'

export const ProfileData = ({ name, verified }) => {

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    return (
        <View>
            <Text style={styles.name}>{name.replace(/\n/g, ' ')}</Text>
            {verified ?
                <VerifiedIcon width={12} height={12} fill={lightblueColor} />
                : null
            }
        </View>
    )
}

const getStyles = (blackColor) => ({
    name: {
        fontSize: 16,
        color: blackColor,
        textAlign: 'center',
        marginTop: 10,
    },
})