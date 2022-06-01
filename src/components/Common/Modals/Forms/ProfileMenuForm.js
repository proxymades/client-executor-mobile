//core
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { blackColorVar, localeVar } from '@utils/cache'

//icons
import { BackIcon, EditProfileIcon, SettingsIcon } from '@common_components/Svg/Svg'


export const ProfileMenuForm = ({
    setModalVisible,
    editProfile
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //handles
    const handleEditProfile = () => {
        setModalVisible(false)
        editProfile()
    }

    const handleOpenSettings = () => {
        setModalVisible(false)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>

            <View style={styles.items}>

                <TouchableOpacity
                    style={styles.item}
                    onPress={handleEditProfile}
                >
                    <EditProfileIcon width='30' height='25' fill={blackColor} />
                    <Text style={styles.text}>{locale.edit}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={handleOpenSettings}
                >
                    <SettingsIcon width='30' height='25' fill={blackColor} />
                    <Text style={styles.text}>{locale.settings}</Text>
                </TouchableOpacity>

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
        width: '100%',
        marginVertical: 20
    },
    items: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    },
    item: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        marginTop: 5,
        color: blackColor,
        textAlign: 'center'
    },
})
