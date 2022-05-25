//core
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { blackColorVar, localeVar } from '@utils/cache'

//icons
import { TerminateIcon, BackIcon, CameraSelectIcon, ImageSelectIcon } from '@common_components/Svg/Svg'

//colors
import { blueColor, grayColor, lightgrayColor, lightredColor } from '@utils/colors'

export const EditImageForm = ({
    existImage,
    deleteImage,
    openImagePicker,
    setModalVisible,
    setPickerType
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //handles
    const handleDeleteImage = () => {
        setModalVisible(false)
        deleteImage()
    }

    const handleLoadImage = () => {
        setModalVisible(false)
        openImagePicker(true)
        setPickerType('gallery')
    }

    const handleMakeImage = () => {
        setModalVisible(false)
        openImagePicker(true)
        setPickerType('camera')
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>

            <View style={styles.items}>

                {existImage ?
                    <>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={handleLoadImage}
                        >
                            <ImageSelectIcon width='30' height='25' fill={blueColor} />
                            <Text style={styles.blueText}>{locale.gallery}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={handleMakeImage}
                        >
                            <CameraSelectIcon width='30' height='25' fill={blueColor} />
                            <Text style={styles.blueText}>{locale.camera}</Text>
                        </TouchableOpacity>
                    </>
                    : null
                }

                {existImage ?
                    <TouchableOpacity
                        style={styles.item}
                        onPress={handleDeleteImage}
                    >
                        <TerminateIcon width='30' height='25' fill={lightredColor} />
                        <Text style={styles.redText}>{locale.delete}</Text>
                    </TouchableOpacity>
                    :
                    <>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={handleLoadImage}
                        >
                            <ImageSelectIcon width='30' height='25' fill={blueColor} />
                            <Text style={styles.blueText}>{locale.gallery}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.item}
                            onPress={handleMakeImage}
                        >
                            <CameraSelectIcon width='30' height='25' fill={blueColor} />
                            <Text style={styles.blueText}>{locale.camera}</Text>
                        </TouchableOpacity>
                    </>
                }

                <TouchableOpacity
                    style={styles.item}
                    onPress={handleCloseModal}
                >
                    <BackIcon width='25' height='25' fill={blackColor} />
                    <Text style={styles.text}>{locale.return}</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const getStyles = (blackColor) => ({
    container: {
        width: '90%',
        marginHorizontal: 20,
        marginVertical: 20
    },
    items: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        alignItems: 'flex-start'
    },
    centerItems: {
        width: '90%',
        marginVertical: 10,
    },
    item: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        marginTop: 5,
        color: blackColor,
        textAlign: 'center'
    },
    redText: {
        fontSize: 14,
        marginTop: 5,
        color: lightredColor,
        textAlign: 'center'
    },
    blueText: {
        fontSize: 14,
        marginTop: 5,
        color: blueColor,
        textAlign: 'center'
    },
    descHeadline: {
        fontSize: 12,
        fontWeight: '500',
        color: blackColor
    },
    descText: {
        fontSize: 12,
        color: grayColor,
        marginLeft: 8

    },
    divider: {
        borderBottomColor: lightgrayColor,
        borderBottomWidth: 0.5,
        marginVertical: 10
    },
})
