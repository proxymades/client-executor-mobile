//core
import React from 'react'
import { View, Pressable, Image, Text, Dimensions } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//common components
import { Avatar } from '@common_components/Avatar/Avatar'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'
import { IMAGES_URI } from '@utils/uri'

//colors
import { CameraIcon, ImageSelectIcon, TrashIcon } from '../Svg/Svg'
import { lightgrayColor, lightredColor } from '@utils/colors'

export const OrderImage = ({
    size,
    action,
    image,
    setImage,
    preview,
    isEdit
}) => {


    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleSelectImage = () => {
        action()
    }

    const handleDeletePreview = () => {
        setImage()
    }

    return (

        <View style={styles.container}>

            <View style={styles.items}>

                <Text style={styles.label}>{locale.photo}</Text>
                {(preview || image !== '') ?
                    <Pressable
                        onPress={handleDeletePreview}
                        hitSlop={{ bottom: 10, left: 40, right: 40, top: 30 }}
                    >
                        <TrashIcon width='20' height='20' fill={lightredColor} />
                    </Pressable>
                    :
                    <Pressable
                        onPress={handleSelectImage}
                        hitSlop={{ bottom: 10, left: 40, right: 40, top: 30 }}
                    >
                        <ImageSelectIcon width='30' height='30' fill={lightgrayColor} />
                    </Pressable>
                }

            </View>

            {preview ?
                <Image
                    style={styles.image}
                    source={{
                        uri: preview,
                    }}
                />
                : null
            }

        </View>

    )
}

const windowWidth = Dimensions.get('window').width

const getStyles = (whiteColor, blackColor) => ({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 15,
        paddingBottom: '60%',
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    label: {
        color: blackColor,
        fontSize: 14,
    },
    image: {
        width: windowWidth - 40,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
})