//core
import React from 'react'
import { Text, View } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { blackColorVar, localeVar } from '@utils/cache'

//common components
import { WhiteRoundButton } from '@components/Common/Buttons/WhiteRoundButton'

export const QuestionMenuForm = ({
    setModalVisible,
    action,
    label
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //handles
    const handleAction = () => {
        setModalVisible(false)
        action()
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>

            <Text style={styles.label}>{label}</Text>


            <View style={styles.items}>


                <WhiteRoundButton
                    handleAction={handleAction}
                >
                    <Text style={styles.text}>{locale.yes}</Text>
                </WhiteRoundButton>

                <WhiteRoundButton
                    handleAction={handleCloseModal}
                >
                    <Text style={styles.text}>{locale.no}</Text>
                </WhiteRoundButton>

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
        fontSize: 10,
        color: blackColor,
        textAlign: 'center'
    },
})
