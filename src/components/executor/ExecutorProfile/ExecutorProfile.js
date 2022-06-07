//core
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { useExecutorProfile } from '@hooks_query/executor/profile/useExecutorProfile'

//utils
import { blackColorVar, isUserTypeVar, whiteColorVar } from '@utils/cache'

//common components
import { ProfileData } from '@common_components/Profile/ProfileData'
import { ProfilePhoto } from '@common_components/Profile/ProfilePhoto'
import { ProfileMenu } from '@common_components/Profile/ProfileMenu'
import { ProfileRegisterDate } from '@common_components/Profile/ProfileRegisterDate'
import { Loader } from '@common_components/Loaders/Loader'
import { ExtraModal } from '@common_components/Modals/ExtraModal'
import { ProfileMenuForm } from '@common_components/Modals/Forms/ProfileMenuForm'

//icons
import { MenuIcon } from '@common_components/Svg/Svg'
import { useMMKVString } from 'react-native-mmkv'
import { blueColor } from '@utils/colors'

export const ExecutorProfile = ({ navigation }) => {

    //states
    const [extraShow, setExtraShow] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        executorProfileLoading,
        executorProfileData,
        worksCount,
        executorProfileRefetch
    } = useExecutorProfile()

    //constants
    const feddbackLength = executorProfileData?.feedbackExecutor.length !== 0 ? executorProfileData?.feedbackExecutor.length : 1
    const rating = executorProfileData?.feedbackExecutor.map(item => item.rating).reduce((prev, curr) => prev + curr, 0) / feddbackLength
    const reviews = executorProfileData?.feedbackExecutor.filter(el => el.message !== '').length

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
            executorProfileRefetch()
            setRefreshing(false)
        }, 2000)
    }

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
                avatar={executorProfileData.avatar}
            />

            <ProfileData
                name={executorProfileData.name}
                verified={executorProfileData.verified}
            />

            <ProfileMenu
                worksCount={worksCount}
                ratingCount={rating}
                reviewsCount={reviews}
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