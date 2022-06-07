//core
import React from 'react'
import { Text, View } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { blackColorVar, localeVar } from '@utils/cache'

//common components
import { WhiteRoundButton } from '@common_components/Buttons/WhiteRoundButton'
import { ProfileLineData } from '@common_components/Profile/ProfileLineData'
import { WhiteButton } from '@common_components/Buttons/WhiteButton'
import { InputMultiline } from '@common_components/Inputs/InputMultiline'

//colors
import { blueColor, lightgrayColor } from '@utils/colors'

export const RatingMenuForm = ({
    setModalVisible,
    action,
    input,
    inputChange,
    phone,
    avatar,
    name,
    verified,
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //handles
    const handleAction = () => {
        inputChange(phone, 'phone')
        setModalVisible(false)
        action()
    }

    return (
        <View style={styles.container}>

            <ProfileLineData
                avatar={avatar}
                name={name}
                verified={verified}
                size={35}
            />

            <Text style={styles.label}>{locale.rating}</Text>

            <View style={styles.ratingItems}>

                <WhiteRoundButton
                    handleAction={() => inputChange(1, 'rating')}
                >
                    <Text style={[styles.ratingText, input.rating === 1 && { color: blueColor }]}>1</Text>
                </WhiteRoundButton>

                <WhiteRoundButton
                    handleAction={() => inputChange(2, 'rating')}
                >
                    <Text style={[styles.ratingText, input.rating === 2 && { color: blueColor }]}>2</Text>
                </WhiteRoundButton>
                <WhiteRoundButton
                    handleAction={() => inputChange(3, 'rating')}
                >
                    <Text style={[styles.ratingText, input.rating === 3 && { color: blueColor }]}>3</Text>
                </WhiteRoundButton>
                <WhiteRoundButton
                    handleAction={() => inputChange(4, 'rating')}
                >
                    <Text style={[styles.ratingText, input.rating === 4 && { color: blueColor }]}>4</Text>
                </WhiteRoundButton>
                <WhiteRoundButton
                    handleAction={() => inputChange(5, 'rating')}
                >
                    <Text style={[styles.ratingText, input.rating === 5 && { color: blueColor }]}>5</Text>
                </WhiteRoundButton>

            </View>

            <InputMultiline
                isRequired={false}
                label={locale.feedbackTo}
                placeholder={locale.feedbackTo_placeholder}
                input={input.message}
                inputChange={(e) => inputChange(e, 'message')}
                symbols={200}
            />

            <View style={styles.confirmButton}>
                <WhiteButton
                    handleAction={handleAction}
                    isDisabled={input.rating === 0}
                >
                    <Text style={[styles.text, input.rating === 0 && { color: lightgrayColor }]}>{locale.confirm}</Text>
                </WhiteButton>
            </View>


        </View>
    )
}

const getStyles = (blackColor) => ({
    container: {
        width: '100%',
        marginVertical: 20,
        alignItems: 'center'
    },
    label: {
        fontSize: 14,
        color: blackColor,
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: '5%',
    },
    ratingItems: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
    },
    ratingText: {
        fontSize: 14,
        color: lightgrayColor,
        textAlign: 'center'
    },
    confirmButton: {
        marginVertical: 20
    },
    text: {
        fontSize: 14,
        color: blueColor,
        paddingHorizontal: 20
    },
})
