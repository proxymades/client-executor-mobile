//core
import React, { useEffect, useState } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Text, TextInput, View, Pressable } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

//hooks
import { useSignup } from '@hooks_mutation/auth/useSignup'
import { useCheckPhone } from '@hooks_query/auth/useCheckPhone'

//utils
import { blackColorVar, localeVar } from '@utils/cache'
import { IS_NUMBERS } from '@utils/regulars'

//common components
import { WhiteButton } from '@common_components/Buttons/WhiteButton'
import { LoadingModal } from '@common_components/Modals/LoadingModal'
import { BlackLoader } from '@common_components/Loaders/BlackLoader'
// import { ExtraModal } from '@common_components/Modals/ExtraModal'
// import { DataPolicyForm } from '@common_components/Modals/Forms/DataPolicyForm'

//icons
import { ShowIcon } from '@common_components/Svg/Svg'

//colors
import { blueColor, lightblueColor, lightgrayColor, lightredColor } from '@utils/colors'

export const Signup = ({ signupState, setSignupState, type, setType }) => {

    //states
    const [signupDisabled, setSignupDisabled] = useState(false)
    const [phoneError, setPhoneError] = useState({ message: '' })
    const [passwordError, setPasswordError] = useState({ message: '' })
    const [passwordVisible, setPasswordVisible] = useState(true)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    // const [dataPolicyExtra, setDataPolicyExtra] = useState(false)

    //hooks
    const { registering, setRegistering, signup } = useSignup(signupState)
    const { checkPhone, phoneData } = useCheckPhone()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //effects
    useEffect(() => {
        if (signupState.phone !== '') {
            if (signupState.phone.match(IS_NUMBERS) && signupState.phone.length > 9) {
                checkPhone({
                    variables: {
                        phone: signupState.phone.trim()
                    }
                })
                setPhoneError({
                    ...phoneError,
                    message: ''
                })
            } else {
                setPhoneError({
                    ...phoneError,
                    message: locale.phone_warning
                })
            }
        } else {
            setPhoneError({
                ...phoneError,
                message: ''
            })
        }
    }, [signupState.phone])

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
        phoneData?.checkPhone &&
            setPhoneError({
                ...phoneError,
                message: locale.phoneUse_warning
            })
    }, [phoneData])

    useEffect(() => {
        phoneError.message === '' &&
            signupState.phone.length > 9 &&
            passwordError.message === '' &&
            signupState.password.length > 5 &&
            toggleCheckBox ?
            setSignupDisabled(false) :
            setSignupDisabled(true)
    }, [signupState, phoneError.message, passwordError.message, toggleCheckBox])

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

    const handleSetClient = () => {
        setType('client')
    }

    return (
        <>


            <View style={styles.container}>

                <View style={styles.typeContainer}>
                    <View style={styles.typeChecker}>
                        <WhiteButton
                            handleAction={handleSetClient}
                            isDisabled={type === 'client'}
                        >
                            <Text
                                style={
                                    [
                                        styles.typeCheckerText, type === 'client' &&
                                        { color: blueColor }
                                    ]
                                }
                            >
                                Клиент
                            </Text>

                        </WhiteButton>
                        <WhiteButton
                            handleAction={() => setType('executor')}
                        >
                            <Text
                                style={
                                    [
                                        styles.typeCheckerText, type === 'executor' &&
                                        { color: blueColor }
                                    ]
                                }
                            >
                                Исполнитель
                            </Text>
                        </WhiteButton>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={e => handleInputChange(e, 'phone')}
                        value={signupState.phone}
                        placeholder={locale.phone_placeholder}
                        placeholderTextColor={lightgrayColor}
                        keyboardType='phone-pad'
                        maxLength={20}
                    />
                    {phoneError.message !== '' &&
                        <Text style={styles.errorMessage}>{phoneError.message}</Text>
                    }

                    <TextInput
                        style={styles.input}
                        onChangeText={e => handleInputChange(e, 'fullName')}
                        value={signupState.fullName}
                        placeholder={type === 'client' ? locale.name_placeholder : 'введите название компании'}
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
    typeContainer: {
        width: '80%',
    },
    typeChecker: {
        textAlign: 'center',
        padding: 10
    },
    typeCheckerText: {
        textAlign: 'center',
        color: blackColor,
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