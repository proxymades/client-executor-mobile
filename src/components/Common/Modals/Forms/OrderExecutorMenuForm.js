//core
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { blackColorVar, isNotifedVar, localeVar } from '@utils/cache'

//icons
import { BackIcon, ProfileRatingIcon, SendRequestIcon, TerminateIcon } from '@common_components/Svg/Svg'

export const OrderExecutorMenuForm = ({
    setModalVisible,
    setProfileMenuShow,
    setRequestMenuShow,
    setCancelMenuShow,
    isExistRequest,
    isWorked,
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //handles
    const handleShowProfileData = () => {
        setProfileMenuShow(true)
    }

    const handleOpenRequestForm = () => {
        if (isWorked) {
            setModalVisible(false)
            isNotifedVar(locale.orderUAccepted_notify)
        } else {
            setRequestMenuShow(true)
        }
    }

    const handlCancelOrder = () => {
        setCancelMenuShow()
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>

            <View style={styles.items}>

                {!isExistRequest ?
                    <TouchableOpacity
                        style={styles.item}
                        onPress={handleOpenRequestForm}
                    >
                        <SendRequestIcon width='30' height='25' fill={blackColor} />
                        <Text style={styles.text}>{locale.sendRequest}</Text>
                    </TouchableOpacity>
                    : null
                }

                <TouchableOpacity
                    style={styles.item}
                    onPress={handleShowProfileData}
                >
                    <ProfileRatingIcon width='30' height='25' fill={blackColor} />
                    <Text style={styles.text}>{locale.profile}</Text>
                </TouchableOpacity>

                {isExistRequest &&
                    !isWorked ?
                    <TouchableOpacity
                        style={styles.item}
                        onPress={handlCancelOrder}
                    >
                        <TerminateIcon width='30' height='25' fill={blackColor} />
                        <Text style={styles.text}>{locale.cancel}</Text>
                    </TouchableOpacity>
                    : null
                }

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
