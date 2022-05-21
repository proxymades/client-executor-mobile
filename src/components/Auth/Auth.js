//core
import React, { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { View, Text, StatusBar, ScrollView, Keyboard } from 'react-native'

//utils
import { blackColorVar, isNotifedVar, localeVar, whiteColorVar } from '@utils/cache'

//components
import { Login } from '@components/Auth/Login'
import { Signup } from '@components/Auth/Signup'

//common components
import { Notify } from '@common_components/Notify/Notify'

//icons
import { AppLogo } from '@common_components/Svg/Svg'

//colors
import { blueColor, grayColor } from '@utils/colors'


export const Auth = () => {

    //states
    const [authForm, setAuthForm] = useState({
        authType: 'login'
    })

    const [loginState, setLoginState] = useState({
        username: '',
        password: ''
    })

    const [signupState, setSignupState] = useState({
        id: '',
        username: '',
        password: '',
        regPhone: '',
        fullName: '',
    })

    //hooks
    const isNotifed = useReactiveVar(isNotifedVar)

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor)

    //effects
    useEffect(() => {
        const notifyTimer = setTimeout(() => isNotifedVar(''), 2500)
        return () => clearTimeout(notifyTimer)
    }, [isNotifed])

    //handles
    const handleSwitchAuth = authType => {
        setAuthForm({
            ...authForm,
            authType: authType
        })
    }

    return (
        <>
            <StatusBar
                animated={true}
            // backgroundColor={whiteColor}
            // barStyle={whiteColor === '#fff' ? 'dark-content' : 'light-content'}
            />

            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps='handler'
            >

                <View style={styles.logoContainer}>
                    <AppLogo height='100%' width='100%' fill={blackColor} />
                </View>

                {authForm.authType === 'signup' &&
                    <Signup
                        signupState={signupState}
                        setSignupState={setSignupState}
                    />
                }

                {authForm.authType === 'login' &&
                    <Login
                        loginState={loginState}
                        setLoginState={setLoginState}
                    />
                }

                <View style={styles.changeButton}>
                    {authForm.authType === 'login' ?
                        <>
                            <Text
                                style={styles.authResetText}
                                onPress={() => setExtraShow(true)}
                            >
                                {locale.forgot}
                            </Text>
                            <Text
                                style={styles.authTypeText}
                                onPress={() => handleSwitchAuth('signup')}
                            >
                                {locale.register}
                            </Text>
                        </>

                        :
                        <Text
                            style={styles.authTypeText}
                            onPress={() => handleSwitchAuth('login')}
                        >
                            {locale.signin}
                        </Text>
                    }
                </View>

            </ScrollView>

            <Notify />

        </>
    )
}

const getStyles = (whiteColor) => ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteColor
    },
    logoContainer: {
        width: 70,
        height: 70
    },
    logo: {
        width: '100%',
        height: '100%'
    },
    changeButton: {
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center'
    },
    authTypeText: {
        color: blueColor,
        fontSize: 14,
        padding: 10
    },
    authResetText: {
        color: grayColor,
        fontSize: 14,
        padding: 10
    },
})