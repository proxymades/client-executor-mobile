//core
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useApolloClient, useReactiveVar } from '@apollo/client'
import messaging from '@react-native-firebase/messaging'
import { clearSession } from '@utils/session'
import { useMMKVString } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native'

//hooks
import { useDeleteClientNotificationToken } from '@hooks_mutation/auth/useDeleteClientNotificationToken'
import { useDeleteExecutorNotificationToken } from '@hooks_mutation/auth/useDeleteExecutorNotificationToken'

//components

//common components
import { ExtraModal } from '@components/Common/Modals/ExtraModal'
import { QuestionMenuForm } from '@components/Common/Modals/Forms/QuestionMenuForm'

//utils
import { blackColorVar, isUserPhoneVar, isUserTypeVar, localeVar, whiteColorVar, isNotifedVar } from '@utils/cache'

//colors
import { blueColor, lightblueColor, lightgrayColor } from '@utils/colors'
import { ThemeMenuForm } from '../Modals/Forms/ThemeMenuForm'
import { LocaleMenuForm } from '../Modals/Forms/LocaleMenuForm'


export const Settings = () => {

    //global hooks
    const client = useApolloClient()
    const navigation = useNavigation()
    const [theme, setTheme] = useMMKVString('theme')
    const [language, setLanguage] = useMMKVString('language')

    //states
    const [logoutRequest, setLogoutRequest] = useState(false)
    const [logout, setLogout] = useState(false)
    const [changeThemeExtra, setChangeThemeExtra] = useState(false)
    const [localeState, setLocaleState] = useState()
    const [changeLocaleExtra, setChangeLocaleExtra] = useState(false)

    //hooks
    const { deleteClientNotificationToken } = useDeleteClientNotificationToken()
    const { deleteExecutorNotificationToken } = useDeleteExecutorNotificationToken()

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
            headerRight: () => (
                logout ?
                    <ActivityIndicator size='small' color={lightblueColor} />
                    : null
            ),
        })
    }, [navigation, logout])

    useEffect(() => {
        language && setLocaleState(language)
    }, [language])

    //handles
    const handleOpenChangePasswordExtra = () => {

    }

    const handleOpenChangeThemeExtra = () => {
        setChangeThemeExtra(true)
    }

    const handleChangeColorTheme = (theme) => {
        setTheme(theme)
    }

    const handleOpenChangeLocaleExtra = () => {
        setChangeLocaleExtra(true)
    }

    const handleCloseChangeLocaleExtra = () => {
        setChangeLocaleExtra(false)
        setLocaleState(language)
    }

    const handleChangeLocale = () => {
        setLanguage(localeState)
        handleCloseChangeLocaleExtra()
    }

    const handleOpenDataPolicyExtra = () => {

    }

    const handleOpenTermsOfUseExtra = () => {

    }

    const handleLogoutRequest = () => {
        setLogoutRequest(true)
    }

    const handleLogout = async () => {
        setLogout(true)
        try {
            await deleteNotificationToken(isUserTypeVar())
        } catch {
            isNotifedVar('Не удалось отключить push-уведомления на сервере')
        } finally {
            clearSession()
            await client.clearStore().catch(() => {})
            setLogout(false)
        }
    }

    const handleOpenDeletingAccountExtra = () => {

    }

    const deleteNotificationToken = (userType) => {
        return messaging()
            .getToken()
            .then(token => {
                if (userType === 'client') {
                    return deleteClientNotificationToken(isUserPhoneVar(), token)
                }
                if (userType === 'executor') {
                    return deleteExecutorNotificationToken(isUserPhoneVar(), token)
                }
            })
    }

    return (

        <View style={styles.container}>

            <View style={styles.items}>

                <View style={styles.item}>
                    <Text style={styles.itemHeader}>{locale.security}</Text>
                </View>
                <View style={styles.subItems}>
                    <TouchableOpacity onPress={handleOpenChangePasswordExtra}>
                        <Text style={styles.subItemHeader}>{locale.changePassword}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item}>
                    <Text style={styles.itemHeader}>{locale.interface}</Text>
                </View>
                <View style={styles.subItems}>
                    <TouchableOpacity onPress={handleOpenChangeThemeExtra}>
                        <Text style={styles.subItemHeader}>{locale.changeTheme}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.subItems}>
                    <TouchableOpacity onPress={handleOpenChangeLocaleExtra}>
                        <Text style={styles.subItemHeader}>{locale.interfaceLocale}</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={styles.item}>
                    <Text style={styles.itemHeader}>{locale.about}</Text>
                </View>
                <View style={styles.subItems}>
                    <TouchableOpacity onPress={handleOpenDataPolicyExtra}>
                        <Text style={styles.subItemHeader}>{locale.dataPolicy}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.subItems}>
                    <TouchableOpacity onPress={handleOpenTermsOfUseExtra}>
                        <Text style={styles.subItemHeader}>{locale.termsOfUse}</Text>
                    </TouchableOpacity>
                </View> */}

                <View style={[styles.item, { marginTop: 30 }]}>
                    <TouchableOpacity onPress={handleLogoutRequest}>
                        <Text style={[styles.itemHeader, { color: lightblueColor }]}>{locale.logout}</Text>
                    </TouchableOpacity>
                </View>


                {/* <View style={[styles.item, { marginTop: 30 }]}>
                    <TouchableOpacity onPress={handleOpenDeletingAccountExtra}>
                        <Text style={[styles.itemHeader, { color: lightgrayColor }]}>{locale.deletingAccount}</Text>
                    </TouchableOpacity>
                </View> */}

            </View>

            <ExtraModal
                modalVisible={logoutRequest}
                setModalVisible={setLogoutRequest}
            >
                <QuestionMenuForm
                    setModalVisible={setLogoutRequest}
                    label={locale.logout}
                    action={handleLogout}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={changeThemeExtra}
                setModalVisible={setChangeThemeExtra}
            >
                <ThemeMenuForm
                    setModalVisible={setChangeThemeExtra}
                    changeTheme={handleChangeColorTheme}
                    currentTheme={theme}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={changeLocaleExtra}
                setModalVisible={handleCloseChangeLocaleExtra}
            >
                <LocaleMenuForm
                    changeLocale={handleChangeLocale}
                    setLocale={setLocaleState}
                    setModalVisible={handleCloseChangeLocaleExtra}
                    currentLocale={localeState}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={logout}
                isEditing={true}
            />

        </View>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
    },
    items: {
        marginTop: 10,
        marginHorizontal: 16,
    },
    item: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemHeader: {
        fontSize: 14,
        color: blueColor
    },
    subItems: {
        paddingTop: 10,
    },
    subItemHeader: {
        fontSize: 14,
        color: blackColor
    },
    logoutWrap: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
})