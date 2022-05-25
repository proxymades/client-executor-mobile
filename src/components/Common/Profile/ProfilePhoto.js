//core
import React from 'react'
import { View, Pressable, Image } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//common components
import { Avatar } from '@common_components/Avatar/Avatar'

//utils
import { blackColorVar, whiteColorVar } from '@utils/cache'
import { IMAGES_URI } from '@utils/uri'

//colors
import { CameraIcon } from '../Svg/Svg'

export const ProfilePhoto = ({ size, action, preview, avatar, isEdit }) => {

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor)

    //handles
    const handleAction = () => {
        action()
    }

    return (
        <View style={styles.photoWrap}>
            {preview?.image ?
                <Image
                    style={styles.avatar}
                    source={{
                        uri: preview.image,
                    }}
                />
                :
                avatar ?
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: `${IMAGES_URI}${avatar}`,
                        }}
                    />
                    :
                    <Avatar size={size} />
            }

            {isEdit ?
                <Pressable
                    style={styles.photoEdit}
                    onPress={handleAction}
                >
                    <CameraIcon width={18} height={18} fill={blackColor} />
                </Pressable>
                : null
            }

        </View>
    )
}

const getStyles = (whiteColor) => ({
    photoWrap: {
        position: 'relative'
    },
    photoEdit: {
        position: 'absolute',
        right: -10,
        bottom: 0,
        backgroundColor: whiteColor,
        borderRadius: 20,
        padding: 5,
        elevation: 5,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
})