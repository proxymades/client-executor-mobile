//core
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { Picker } from '@react-native-picker/picker'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//icons
import { BackIcon, SaveIcon } from '@common_components/Svg/Svg'

//colors
import { blueColor, grayColor, lightgrayColor } from '@utils/colors'

export const LocaleMenuForm = ({
    changeLocale,
    setLocale,
    setModalVisible,
    currentLocale
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)
    const whiteColor = useReactiveVar(whiteColorVar)

    //styles
    const styles = getStyles(blackColor)

    //handles
    const handleCloseModal = () => {
        setModalVisible(false)
    }

    const handleInputLocale = (language) => {
        setLocale(language)
    }

    return (
        <View style={styles.container}>

            <View style={styles.items}>

                <TouchableOpacity
                    style={styles.item}
                    onPress={changeLocale}
                >
                    <SaveIcon width='25' height='25' fill={blackColor} />
                    <Text style={styles.text}>{locale.save}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={handleCloseModal}
                >
                    <BackIcon width='25' height='25' fill={blackColor} />
                    <Text style={styles.text}>{locale.return}</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.divider} />

            <View style={styles.pickerContainer}>
                <Picker
                    style={{ color: blueColor }}
                    dropdownIconColor={blueColor}
                    itemStyle={{ backgroundColor: whiteColor, height: 50 }}
                    selectedValue={currentLocale}
                    onValueChange={(itemValue, itemIndex) =>
                        handleInputLocale(itemValue)
                    }>
                    <Picker.Item label="Русский" value="ru" style={{ color: blackColor, fontSize: 14 }} />
                    <Picker.Item label="English" value="en" style={{ color: blackColor, fontSize: 14 }} />
                </Picker>
            </View>

        </View>
    )
}

const getStyles = (blackColor) => ({
    container: {
        width: '90%',
        marginHorizontal: 20,
        marginVertical: 20
    },
    pickerContainer: {
        marginHorizontal: -10,
        height: 40,
        justifyContent: 'center',
        marginVertical: 10
    },
    items: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        alignItems: 'flex-start'
    },
    centerItems: {
        width: '90%',
        marginVertical: 10,
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
    divider: {
        borderBottomColor: lightgrayColor,
        borderBottomWidth: 0.5,
        marginVertical: 10
    },
})
