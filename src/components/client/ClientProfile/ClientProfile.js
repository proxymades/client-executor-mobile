//core
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { useClientProfile } from '@hooks_query/client/profile/useClientProfile'

//utils
import { blackColorVar, isUserTypeVar, localeVar, whiteColorVar } from '@utils/cache'

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

//colors
import { blueColor } from '@utils/colors'

export const ClientProfile = ({ navigation }) => {

    //states
    const [extraShow, setExtraShow] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        clientProfileLoading,
        clientProfileData,
        clientProfileRefetch
    } = useClientProfile()

    //constants
    const feddbackLength = clientProfileData?.feedbackClient.length !== 0 ? clientProfileData?.feedbackClient.length : 1
    const rating = clientProfileData?.feedbackClient.map(item => item.rating).reduce((prev, curr) => prev + curr, 0) / feddbackLength
    const reviews = clientProfileData?.feedbackClient.filter(el => el.message !== '').length

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
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            clientProfileRefetch()
            setRefreshing(false)
        }, 2000)
    }

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

    const [token, setToken] = useMMKVString('token')
    const handleOpenSettings = () => {
        setToken('')
    }

    if (clientProfileLoading) return <Loader />

    return (

        <ScrollView
            keyboardShouldPersistTaps='handler'
            style={styles.container}
            contentContainerStyle={{ paddingVertical: 80, alignItems: 'center' }}
            nestedScrollEnabled={true}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[blueColor]}
                    progressBackgroundColor={whiteColor}
                />
            }
        >

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
                ratingCount={rating}
                reviewsCount={reviews}
                type={isUserTypeVar()}
                openOrders={handleOpenOrders}
            />

            <View style={styles.orderButton}>
                <WhiteButton handleAction={handleCreateOrder}>
                    <Text style={styles.orderText}>{locale.newOrder}</Text>
                </WhiteButton>
            </View>

            <ProfileRegisterDate createdAt={clientProfileData.createdAt} />

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

        </ScrollView >
    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        paddingHorizontal: 16,
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