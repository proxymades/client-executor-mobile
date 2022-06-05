//core
import React from 'react'
import { View, Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar } from '@utils/cache'

//components
import { Avatar } from '../Avatar/Avatar'

//icons
import { VerifiedIcon } from '../Svg/Svg'

//colors
import { lightblueColor } from '@utils/colors'

export const ProfileLineData = ({ avatar, name, verified, size }) => {

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    return (

        <View style={styles.container}>

            <Avatar size={size} avatar={avatar} />

            <Text style={styles.name}>{name}</Text>

            {verified ?
                <VerifiedIcon width={size / 3} height={size / 3} fill={lightblueColor} />
                : null
            }

        </View>

    )
}

const getStyles = (blackColor) => ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 14,
        color: blackColor,
        marginHorizontal: 5
    },
})