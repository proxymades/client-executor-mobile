//core
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { useClientProfile } from '@hooks_query/client/useClientProfile'

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

    const handleCreateOrder = () => {
        navigation.push('CreateOrder')
    }

    const handleOpenOrders = () => {
        navigation.push('ClientOrders')
    }

    if (clientProfileLoading) return <Loader />

    return (
        <View style={styles.container}>

            <ProfilePhoto
                size={80}
                avatar={clientProfileData.avatar}
            />

            <ProfileData
                name={clientProfileData.name}
                verified={clientProfileData.verified}
            />

            <ProfileMenu
                ordersCount={clientProfileData.order.length}
                ratingCount={5}
                reviewsCount={77}
                type={isUserTypeVar()}
                openOrders={handleOpenOrders}
            />

            {isUserTypeVar() === 'client' ?
                <View style={styles.orderButton}>
                    <WhiteButton handleAction={handleCreateOrder}>
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