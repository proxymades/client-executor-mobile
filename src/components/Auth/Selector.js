//core
import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Text, View } from 'react-native'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//common components
import { WhiteButton } from '@common_components/Buttons/WhiteButton'

//icons
import { AppLogo } from '@common_components/Svg/Svg'

export const Selector = ({ navigation }) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)
    const whiteColor = useReactiveVar(whiteColorVar)

    //styles
    const styles = getStyles(blackColor, whiteColor)

    //handles
    const handleSetAccountType = (type) => {
        navigation.push('Auth', { type: type })
    }

    return (

        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <AppLogo height='100%' width='100%' fill={blackColor} />
            </View>

            <View style={styles.typeContainer}>
                <View style={styles.typeChecker}>
                    <WhiteButton
                        handleAction={() => handleSetAccountType('client')}
                    >
                        <Text style={styles.typeCheckerText}>
                            {locale.client}
                        </Text>

                    </WhiteButton>
                    <WhiteButton
                        handleAction={() => handleSetAccountType('executor')}
                    >
                        <Text style={styles.typeCheckerText}>
                            {locale.executor}
                        </Text>
                    </WhiteButton>
                </View>
            </View>

        </View>

    )
}

const getStyles = (blackColor, whiteColor) => ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteColor
    },
    typeContainer: {
        width: '60%',
    },
    logoContainer: {
        width: 70,
        height: 20,
        marginBottom: 40,
    },
    typeChecker: {
        textAlign: 'center',
        justifyContent: 'space-between',
        height: 100
    },
    typeCheckerText: {
        textAlign: 'center',
        color: blackColor,
        fontSize: 14,
    },
})