//core
import React, { useState, useEffect } from 'react'
import { useMutation, useReactiveVar } from '@apollo/client'
import { Text, TextInput, View, Pressable } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import jwt_decode from 'jwt-decode'

//gql
import { LOGIN } from '@gql_mutation/auth/Login'

//utils
import { blackColorVar, isNotifedVar, localeVar } from '@utils/cache'

//common components
import { WhiteButton } from '@common_components/Buttons/WhiteButton'
import { BlackLoader } from '@common_components/Loaders/BlackLoader'
import { LoadingModal } from '@common_components/Modals/LoadingModal'

//icons
import { ShowIcon } from '@common_components/Svg/Svg'

//colors
import { lightblueColor, lightgrayColor } from '@utils/colors'

export const Login = ({ loginState, setLoginState }) => {

    //hooks
    const [token, setToken] = useMMKVString('token')

    //states
    const [loginDisabled, setLoginDisabled] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [logining, setLogining] = useState(false)

    //mutations
    const [login] = useMutation(LOGIN, {
        variables: {
            username: loginState.username,
            password: loginState.password
        },
        onCompleted: ({ login }) => {
            setToken(login.token)
        },
        onError: (err) => {
            isNotifedVar(`${err.message}`)
            setLogining(false)
        }
    })

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //effects
    useEffect(() => {
        loginState.username.length > 2 &&
            loginState.password.length > 6 ?
            setLoginDisabled(false) :
            setLoginDisabled(true)
    }, [loginState])

    //handles
    const handleAuth = () => {
        setLogining(true)
        login()
    }

    const handleInputChange = (value, name) => {
        const list = { ...loginState }
        list[name] = value
        setLoginState(list)
    }

    const handlePasswordVisible = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <>
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={e => handleInputChange(e, 'username')}
                        value={loginState.username}
                        placeholder={locale.login_placeholder}
                        placeholderTextColor={lightgrayColor}
                        autoCapitalize='none'
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={e => handleInputChange(e, 'password')}
                        value={loginState.password}
                        placeholder={locale.password_placeholder}
                        placeholderTextColor={lightgrayColor}
                        autoCapitalize='none'
                        secureTextEntry={passwordVisible}
                    />
                    <Pressable
                        style={styles.passwordIcon}
                        onPress={handlePasswordVisible}
                    >
                        <ShowIcon width='20' height='20' fill={passwordVisible ? lightgrayColor : lightblueColor} />
                    </Pressable>
                </View>

                <WhiteButton
                    handleAction={handleAuth}
                    isDisabled={loginDisabled}
                >
                    <Text style={loginDisabled ? styles.inactiveButtonText : styles.activeButtonText}>{locale.signinText}</Text>
                </WhiteButton>

            </View>

            <LoadingModal modalVisible={logining}>
                <View style={styles.creatingWrap}>
                    <BlackLoader label={locale.loading} />
                </View>
            </LoadingModal>

        </>
    )
}

const getStyles = (blackColor) => ({
    container: {
        width: '80%',
        alignItems: 'center'
    },
    inputContainer: {
        width: '100%',
    },
    passwordIcon: {
        position: 'absolute',
        bottom: 15,
        right: 0
    },
    input: {
        width: '100%',
        height: 40,
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: lightgrayColor,
        padding: 10,
        paddingRight: 35,
        color: blackColor
    },
    activeButtonText: {
        color: blackColor,
    },
    activeButtonText: {
        color: blackColor,
        paddingHorizontal: 30
    },
    inactiveButtonText: {
        color: lightgrayColor,
        paddingHorizontal: 30
    },
    creatingWrap: {
        width: '100%',
        height: '100%',
        zIndex: 3,
        position: 'absolute',
    },
})
