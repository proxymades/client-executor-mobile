//core
import React, { useEffect, useState } from 'react'
import { useMutation, useLazyQuery, useReactiveVar } from '@apollo/client'
import cuid from 'cuid'
import { Text, TextInput, View, Pressable } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import CheckBox from '@react-native-community/checkbox'
import jwt_decode from 'jwt-decode'

//gql
import { SIGNUP } from '@gql_mutation/auth/Signup'
import { CHECK_USERNAME } from '@gql_query/auth/CheckUsername'
import { CHECK_REG_PHONE } from '@gql_query/auth/CheckRegPhone'

//utils
import { blackColorVar, isNotifedVar, localeVar } from '@utils/cache'
import { REG_LOGIN, REG_PHONE } from '@utils/regulars'

//common components
import { WhiteButton } from '@common_components/Buttons/WhiteButton'
import { LoadingModal } from '@common_components/Modals/LoadingModal'
import { BlackLoader } from '@common_components/Loaders/BlackLoader'
import { ExtraModal } from '@common_components/Modals/ExtraModal'
// import { DataPolicyForm } from '@common_components/Modals/Forms/DataPolicyForm'

//icons
import { ShowIcon } from '@common_components/Svg/Svg'

//colors
import { lightblueColor, lightgrayColor, lightredColor } from '@utils/colors'

export const Signup = ({ signupState, setSignupState }) => {

    //hooks
    const [token, setToken] = useMMKVString('token')

    //states
    const [signupDisabled, setSignupDisabled] = useState(false)
    const [signupError, setSignupError] = useState({ message: '' })
    const [regPhoneError, setRegPhoneError] = useState({ message: '' })
    const [passwordError, setPasswordError] = useState({ message: '' })
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [registering, setRegistering] = useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    // const [dataPolicyExtra, setDataPolicyExtra] = useState(false)

    //queries
    const [checkUsername, { data: signupData }] = useLazyQuery(CHECK_USERNAME, {
        fetchPolicy: 'network-only'
    })

    const [checkRegPhone, { data: regPhoneData }] = useLazyQuery(CHECK_REG_PHONE, {
        fetchPolicy: 'network-only'
    })

    //mutations
    const [signup] = useMutation(SIGNUP, {
        variables: {
            id: cuid(),
            username: signupState.username.toLowerCase().trim(),
            password: signupState.password.trim(),
            regPhone: signupState.regPhone.trim(),
            fullName: signupState.fullName.trim(),
        },
        onCompleted: ({ signup }) => {
            setToken(signup.token)
        },
        onError: (err) => {
            isNotifedVar(`${err.message}`)
            setRegistering(false)
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
        let signupTimer
        if (signupState.username !== '' && signupState.username.length < 3) {
            signupTimer = setTimeout(() => setSignupError({
                ...signupError,
                message: locale.login_warning
            }), 1000)
        } else
            setSignupError({
                ...signupError,
                message: ''
            })
        if (signupState.username.length > 2) {
            signupState.username.match(REG_LOGIN) ?
                checkUsername({
                    variables: {
                        username: signupState.username.trim()
                    }
                }) :
                setSignupError({
                    ...signupError,
                    message: locale.loginSymbols_warning
                })
        }
        return () => clearTimeout(signupTimer)
    }, [signupState.username])

    useEffect(() => {
        if (signupState.regPhone !== '') {
            if (signupState.regPhone.match(REG_PHONE) && signupState.regPhone.length > 10) {
                checkRegPhone({
                    variables: {
                        regPhone: signupState.regPhone.trim()
                    }
                })
                setRegPhoneError({
                    ...regPhoneError,
                    message: ''
                })
            } else {
                setRegPhoneError({
                    ...regPhoneError,
                    message: locale.phone_warning
                })
            }
        } else {
            setRegPhoneError({
                ...regPhoneError,
                message: ''
            })
        }
    }, [signupState.regPhone])

    useEffect(() => {
        if (signupState.password !== '') {
            if (signupState.password.length > 6) {
                setPasswordError({
                    ...passwordError,
                    message: ''
                })
            } else {
                setPasswordError({
                    ...passwordError,
                    message: locale.password_warning
                })
            }
        } else {
            setPasswordError({
                ...passwordError,
                message: ''
            })
        }
    }, [signupState.password])

    useEffect(() => {
        signupData?.checkUsername &&
            setSignupError({
                ...signupError,
                message: locale.loginUse_warning
            })
    }, [signupData])

    useEffect(() => {
        regPhoneData?.checkRegPhone &&
            setRegPhoneError({
                ...regPhoneError,
                message: locale.phoneUse_warning
            })
    }, [regPhoneData])

    useEffect(() => {
        signupError.message === '' && signupState.username.length > 2 &&
            regPhoneError.message === '' && signupState.regPhone.length > 10 &&
            passwordError.message === '' && signupState.password.length > 6 &&
            toggleCheckBox ?
            setSignupDisabled(false) : setSignupDisabled(true)
    }, [signupState, signupError.message, regPhoneError.message, passwordError.message, toggleCheckBox])

    //handles
    const handleAuth = () => {
        setRegistering(true)
        signup()
    }

    const handleInputChange = (value, name) => {
        const list = { ...signupState }
        list[name] = value
        setSignupState(list)
    }

    const handlePasswordVisible = () => {
        setPasswordVisible(!passwordVisible)
    }

    const handleOpenDataPolicyExtra = () => {
        setDataPolicyExtra(true)
    }

    return (
        <>

            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={e => handleInputChange(e, 'regPhone')}
                        value={signupState.regPhone}
                        placeholder={locale.regPhone_placeholder}
                        placeholderTextColor={lightgrayColor}
                        keyboardType='phone-pad'
                        maxLength={20}
                    />
                    {regPhoneError.message !== '' &&
                        <Text style={styles.errorMessage}>{regPhoneError.message}</Text>
                    }

                    <TextInput
                        style={styles.input}
                        onChangeText={e => handleInputChange(e, 'username')}
                        value={signupState.username}
                        placeholder={locale.login_placeholder}
                        placeholderTextColor={lightgrayColor}
                        autoCapitalize='none'
                        maxLength={30}
                    />
                    {signupError.message !== '' &&
                        <Text style={styles.errorMessage}>{signupError.message}</Text>
                    }

                    <TextInput
                        style={styles.input}
                        onChangeText={e => handleInputChange(e, 'fullName')}
                        value={signupState.fullName}
                        placeholder="имя и фамилия"
                        placeholderTextColor={lightgrayColor}
                        autoCapitalize='words'
                        maxLength={90}
                    />

                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={e => handleInputChange(e, 'password')}
                        value={signupState.password}
                        placeholder={locale.password_placeholder}
                        placeholderTextColor={lightgrayColor}
                        autoCapitalize='none'
                        secureTextEntry={passwordVisible}
                        maxLength={30}
                    />
                    <Pressable
                        style={styles.passwordIcon}
                        onPress={handlePasswordVisible}
                    >
                        <ShowIcon width='20' height='20' fill={passwordVisible ? lightgrayColor : lightblueColor} />
                    </Pressable>
                    {passwordError.message !== '' &&
                        <Text style={styles.errorMessage}>{passwordError.message}</Text>
                    }
                </View>

                <View style={styles.inputAcceptContainer}>
                    <CheckBox
                        tintColors={{ true: lightblueColor }}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text style={styles.inputAcceptText}>
                        {locale.policyAccept}
                        <Text onPress={handleOpenDataPolicyExtra} style={styles.inputAcceptMoreText}> {locale.learnMore}</Text>
                    </Text>

                </View>

                <WhiteButton
                    handleAction={handleAuth}
                    isDisabled={signupDisabled}
                >
                    <Text style={signupDisabled ? styles.inactiveButtonText : styles.activeButtonText}>{locale.registerText}</Text>
                </WhiteButton>

            </View>

            <LoadingModal modalVisible={registering}>
                <View style={styles.creatingWrap}>
                    <BlackLoader label={locale.loading} />
                </View>
            </LoadingModal>

            {/* <ExtraModal
                modalVisible={dataPolicyExtra}
                setModalVisible={setDataPolicyExtra}
            >
                <DataPolicyForm
                    setModalVisible={setDataPolicyExtra}
                />
            </ExtraModal> */}

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
    inputAcceptContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 20
    },
    inputAcceptText: {
        color: blackColor,
        fontSize: 12,
    },
    inputAcceptMoreText: {
        color: lightblueColor,
        fontSize: 12,
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
        padding: 7,
        color: blackColor
    },
    activeButtonText: {
        color: blackColor,
        paddingHorizontal: 30
    },
    inactiveButtonText: {
        color: lightgrayColor,
        paddingHorizontal: 30
    },
    errorMessage: {
        fontSize: 12,
        color: lightredColor,
    },
    creatingWrap: {
        width: '100%',
        height: '100%',
        zIndex: 3,
        position: 'absolute',
    },
})