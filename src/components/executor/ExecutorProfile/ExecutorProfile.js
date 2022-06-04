//core
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { useExecutorProfile } from '@hooks_query/executor/useExecutorProfile'

//utils
import { blackColorVar, isUserPhoneVar, isUserTypeVar, localeVar, whiteColorVar } from '@utils/cache'

//common components
import { ProfileData } from '@common_components/Profile/ProfileData'
import { ProfilePhoto } from '@common_components/Profile/ProfilePhoto'
import { ProfileMenu } from '@common_components/Profile/ProfileMenu'
import { WhiteButton } from '@common_components/Buttons/WhiteButton'
import { ProfileRegisterDate } from '@common_components/Profile/ProfileRegisterDate'
import { Loader } from '@common_components/Loaders/Loader'
import { ExtraModal } from '@common_components/Modals/ExtraModal'
import { ProfileMenuForm } from '@common_components/Modals/Forms/ProfileMenuForm'

//icons
import { MenuIcon } from '@common_components/Svg/Svg'
import { useMMKVString } from 'react-native-mmkv'

export const ExecutorProfile = ({ navigation }) => {

    //states
    const [extraShow, setExtraShow] = useState(false)

    //hooks
    const { executorProfileLoading, executorProfileData, worksCount } = useExecutorProfile(isUserPhoneVar())

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //effects
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <TouchableOpacity
                    style={styles.settings}
                    onPress={handleOpenExtra}
                >
                    <MenuIcon width='22' height='22' fill={blackColor} />
                </TouchableOpacity>
            ,
            headerTitleAlign: 'left',
        })
    }, [navigation, blackColor])

    //handles
    const handleOpenExtra = () => {
        setExtraShow(true)
    }

    const handleEditProfile = () => {
        setExtraShow(false)
        navigation.push('EditExecutorProfile')
    }

    const handleOpenWorks = () => {
        navigation.push('ExecutorWorks')
    }
    const [token, setToken] = useMMKVString('token')

    const handleOpenSettings = () => {
        setToken('')
    }

    if (executorProfileLoading) return <Loader />

    return (
        <View style={styles.container}>

            <ProfilePhoto
                size={80}
                avatar={executorProfileData.avatar}
            />

            <ProfileData
                name={executorProfileData.name}
                verified={executorProfileData.verified}
            />

            <ProfileMenu
                worksCount={worksCount}
                ratingCount={5}
                reviewsCount={77}
                type={isUserTypeVar()}
                openWorks={handleOpenWorks}
            />

            <ProfileRegisterDate createdAt={executorProfileData.createdAt} />

            <ExtraModal
                modalVisible={extraShow}
                setModalVisible={setExtraShow}
            >
                <ProfileMenuForm
                    setModalVisible={setExtraShow}
                    editProfile={handleEditProfile}
                    openSettings={handleOpenSettings}
                />
            </ExtraModal>

        </View >
    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        alignItems: 'center',
        paddingTop: '30%'
    },
    orderButton: {
        width: '60%',
        marginTop: 40,
    },
    orderText: {
        fontSize: 14,
        paddingHorizontal: 20,
        color: blackColor
    },
    settings: {
        marginLeft: 20
    },
})