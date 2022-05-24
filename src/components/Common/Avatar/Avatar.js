//core
import React from 'react'
import { Image, View } from 'react-native'

//utils
import { IMAGES_URI } from '@utils/uri'

//icons
import { AvatarIcon } from '@common_components/Svg/Svg'

//colors
import { grayColor } from '@utils/colors'

export const Avatar = ({ avatar, size }) => {

    //styles
    const styles = getStyles()

    return (
        <>
            {avatar ?
                <Image
                    style={[styles.avatar, { width: size, height: size }]}
                    source={{
                        uri: `${IMAGES_URI}${avatar}`,
                    }}
                />
                :
                <View style={styles.avatar}>
                    <AvatarIcon width={size} height={size} fill={grayColor} />
                </View>
            }
        </>
    )
}

const getStyles = () => ({
    avatar: {
        borderRadius: 100,
    }
})