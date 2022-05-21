//core
import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity, RefreshControl, } from 'react-native'
import { NetworkStatus, useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, isUsernameVar, localeVar, whiteColorVar } from '@utils/cache'
import { IMAGES_URI } from '@utils/uri'

//hooks

//common components

//components

//icons

//colors
import { blueColor } from '@utils/colors'

export const Profile = ({ route, navigation }) => {

    //constants
    const isProfileTab = route.name === 'Profile'
    const username = route?.params?.username || isUsernameVar()

    //states
    const [refreshing, setRefreshing] = useState(false)
    const [extraModalVisible, setExtraModalVisible] = useState(false)
    const [createModalVisible, setCreateModalVisible] = useState(false)
    const [linkedUsername] = useState(route?.params?.username)
    const [complaintModal, setComplaintModal] = useState(false)
    const [followStatus, setFollowStatus] = useState(false)
    const [externaLinkModalVisible, setExternalLinkModalVisible] = useState(false)
    const [externaSocialModalVisible, setExternalSocialModalVisible] = useState(false)
    const [externalSocial, setExternalSocial] = useState('')

    //hooks

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //constants

    //hooks

    //handles
    const handleOpenExtra = () => {
        setExtraModalVisible(true)
    }

    const handleEditProfile = () => {
        navigation.navigate('EditProfile')
    }

    const handleOpenStatistics = () => {
        navigation.navigate('StatisticsScreen')
    }

    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            refetchUserProfile()
            refetchIsClean()
            setRefreshing(false)
        }, 2000)
    }

    const handleOpenCreateModal = () => {
        setCreateModalVisible(true)
    }

    return (
        <>

            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[blueColor]}
                        progressBackgroundColor={whiteColor}
                    />
                }
                contentContainerStyle={{ paddingBottom: 60 }}
                showsVerticalScrollIndicator={false}
            >
                <Text>Progile</Text>
            </ScrollView>

        </>

    )
}

const getStyles = (whiteColor) => ({
    headerRightContainer: {
        flexDirection: 'row',
    },
    headerRightItem: {
        paddingRight: 0,
        paddingLeft: 10
    },
    container: {
        flex: 1,
        backgroundColor: whiteColor,
    },
    extraDots: {
        marginLeft: 20
    },
})