//core
import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity, RefreshControl, } from 'react-native'
import { NetworkStatus, useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, isUserPhoneVar, isUserTypeVar, localeVar, whiteColorVar } from '@utils/cache'

//common components
import { ProfileData } from '@common_components/Profile/ProfileData'
import { ProfilePhoto } from '@common_components/Profile/ProfilePhoto'
import { ProfileMenu } from '@components/Common/Profile/ProfileMenu'
import { WhiteButton } from '@components/Common/Buttons/WhiteButton'
import { ProfileRegisterDate } from '@components/Common/Profile/ProfileRegisterDate'
import { useClientProfile } from '@hooks_query/auth/client/useClientProfile'
import { Loader } from '@components/Common/Loaders/Loader'
import { MenuIcon } from '@components/Common/Svg/Svg'
import { ExtraModal } from '@components/Common/Modals/ExtraModal'
import { ProfileMenuForm } from '@components/Common/Modals/Forms/ProfileMenuForm'

export const ClientProfile = ({ route, navigation }) => {

    //states
    const [extraShow, setExtraShow] = useState(false)

    //hooks
    const { clientProfileLoading, clientProfileData } = useClientProfile(isUserPhoneVar())

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
        navigation.push('EditClientProfile')
    }

    if (clientProfileLoading) return <Loader />

    return (
        <View style={styles.container}>

            <ProfilePhoto
                size={18}
                avatar={clientProfileData.avatar}
            />

            <ProfileData
                name={clientProfileData.name}
                verified={clientProfileData.verified}
            />

            <ProfileMenu
                ordersCount={30}
                ratingCount={5}
                reviewsCount={77}
                type={isUserTypeVar()}
            />

            {isUserTypeVar() === 'client' ?
                <View style={styles.orderButton}>
                    <WhiteButton>
                        <Text style={styles.orderText}>{locale.newOrder}</Text>
                    </WhiteButton>
                </View>
                : null
            }

            <ProfileRegisterDate createdAt={clientProfileData.createdAt} />

            <ExtraModal
                modalVisible={extraShow}
                setModalVisible={setExtraShow}
            >
                <ProfileMenuForm
                    setModalVisible={setExtraShow}
                    editProfile={handleEditProfile}
                />
            </ExtraModal>

        </View>
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