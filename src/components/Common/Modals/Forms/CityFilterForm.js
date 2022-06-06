//core
import React from 'react'
import { Text, View } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { blackColorVar, localeVar } from '@utils/cache'

//common components
import { WhiteButton } from '@components/Common/Buttons/WhiteButton'
import { SwitchLine } from '@components/Common/Inputs/SwitchLine'

export const CityFilterForm = ({
    setModalVisible,
    input,
    inputChange,
    label,
    setSelectedCity
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //handles
    const handleCloseModal = () => {
        setModalVisible(false)
        setSelectedCity(actual => !actual)
    }

    return (
        <View style={styles.container}>

            <Text style={styles.label}>{label}</Text>

            <SwitchLine
                input={input.nursultan}
                inputChange={e => inputChange(e, 'nursultan')}
                positive={`${locale.nursultan}${locale.toggleOn}`}
                negative={`${locale.nursultan}${locale.toggleOff}`}
            />

            <SwitchLine
                input={input.karaganda}
                inputChange={e => inputChange(e, 'karaganda')}
                positive={`${locale.karaganda}${locale.toggleOn}`}
                negative={`${locale.karaganda}${locale.toggleOff}`}
            />

            <SwitchLine
                input={input.almaty}
                inputChange={e => inputChange(e, 'almaty')}
                positive={`${locale.almaty}${locale.toggleOn}`}
                negative={`${locale.almaty}${locale.toggleOff}`}
            />

            <SwitchLine
                input={input.atyrau}
                inputChange={e => inputChange(e, 'atyrau')}
                positive={`${locale.atyrau}${locale.toggleOn}`}
                negative={`${locale.atyrau}${locale.toggleOff}`}
            />

            <View style={styles.items}>

                <WhiteButton
                    handleAction={handleCloseModal}
                >
                    <Text style={styles.text}>{locale.closeWindow}</Text>
                </WhiteButton>

            </View>

        </View>
    )
}

const getStyles = (blackColor) => ({
    container: {
        width: '100%',
        marginVertical: 30
    },
    items: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '70%',
        alignSelf: 'center',
    },
    label: {
        textAlign: 'center',
        color: blackColor,
        fontSize: 14,
    },
    text: {
        fontSize: 12,
        color: blackColor,
        textAlign: 'center',
        marginHorizontal: 10
    },
})
