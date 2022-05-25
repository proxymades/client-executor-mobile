//core
import React from 'react'
import { View, Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { Picker } from '@react-native-picker/picker'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//colors
import { blueColor, lightgrayColor } from '@utils/colors'

export const PickerLine = ({
    inputChange,
    input,
    label,
    pickerType,
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)
    const whiteColor = useReactiveVar(whiteColorVar)

    //styles
    const styles = getStyles(blackColor, whiteColor)

    return (

        <>
            <Text style={styles.label}>{label} *</Text>

            <View style={styles.pickerContainer}>

                {pickerType === 'category' ?
                    <Picker
                        style={{ color: blueColor }}
                        dropdownIconColor={blueColor}
                        selectedValue={input}
                        onValueChange={inputChange}
                    >
                        <Picker.Item label={locale.polygraphy} value="polygraphy" style={{ color: blackColor, fontSize: 14 }} />
                        <Picker.Item label={locale.outad} value="outad" style={{ color: blackColor, fontSize: 14 }} />
                        <Picker.Item label={locale.souvenir} value="souvenir" style={{ color: blackColor, fontSize: 14 }} />
                    </Picker>
                    :
                    <Picker
                        style={{ color: blueColor }}
                        dropdownIconColor={blueColor}
                        selectedValue={input}
                        onValueChange={inputChange}
                    >
                        <Picker.Item label={locale.nursultan} value="nursultan" style={{ color: blackColor, fontSize: 14 }} />
                        <Picker.Item label={locale.almaty} value="almaty" style={{ color: blackColor, fontSize: 14 }} />
                        <Picker.Item label={locale.karaganda} value="karaganda" style={{ color: blackColor, fontSize: 14 }} />
                        <Picker.Item label={locale.atyrau} value="atyrau" style={{ color: blackColor, fontSize: 14 }} />
                    </Picker>
                }

            </View>

        </>
    )
}

const getStyles = (blackColor, whiteColor) => ({
    pickerContainer: {
        height: 40,
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: lightgrayColor,
        borderRadius: 50,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    label: {
        color: blackColor,
        fontSize: 14,
        marginTop: 15,
        width: '90%',
        alignSelf: 'center',
    },
})