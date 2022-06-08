//core
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { blackColorVar, localeVar } from '@utils/cache'

//icons
import {
    BackIcon,
    DefaultIcon,
    MoonIcon,
    SunIcon
} from '@common_components/Svg/Svg'

//colors
import { blueColor } from '@utils/colors'

export const ThemeMenuForm = ({
    setModalVisible,
    currentTheme,
    changeTheme,
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //handles
    const handleSetTheme = (theme) => {
        changeTheme(theme)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>

            <View style={styles.items}>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSetTheme('light')}
                >
                    <SunIcon width='25' height='25' fill={currentTheme === 'light' ? blueColor : blackColor} />
                    <Text style={[styles.text, currentTheme === 'light' && { color: blueColor }]}>{locale.lightTheme}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSetTheme('dark')}
                >
                    <MoonIcon width='25' height='25' fill={currentTheme === 'dark' ? blueColor : blackColor} />
                    <Text style={[styles.text, currentTheme === 'dark' && { color: blueColor }]}>{locale.darkTheme}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleSetTheme(undefined)}
                >
                    <DefaultIcon width='25' height='25' fill={!currentTheme ? blueColor : blackColor} />
                    <Text style={[styles.text, !currentTheme && { color: blueColor }]}>{locale.defaultTheme}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={handleCloseModal}
                >
                    <BackIcon width='25' height='25' fill={blackColor} />
                    <Text style={styles.text}>{locale.return}</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const getStyles = (blackColor) => ({
    container: {
        width: '100%',
        marginVertical: 20,
    },
    items: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
    },
    item: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        marginTop: 5,
        color: blackColor,
        textAlign: 'center'
    },
})
