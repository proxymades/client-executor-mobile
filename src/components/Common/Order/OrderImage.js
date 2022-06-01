//core
import React from 'react'
import { View, Pressable, Text, Dimensions, Image } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//icons
import { ImageSelectIcon, TrashIcon } from '../Svg/Svg'

//colors
import { lightgrayColor, lightredColor } from '@utils/colors'
import { IMAGES_URI } from '@utils/uri'

export const OrderImage = ({
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
                {(preview || image !== '') && !isEdit ?
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

            {!isEdit && preview ?
                <Image
                    style={styles.image}
                    source={{
                        uri: preview,
                    }}
                />
                :
                isEdit && preview ?
                    <Image
                        style={styles.image}
                        source={{
                            uri: preview,
                        }}
                    />
                    :
                    isEdit && image !== '' ?
                        <Image
                            style={styles.image}
                            source={{
                                uri: `${IMAGES_URI}${image}`,
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