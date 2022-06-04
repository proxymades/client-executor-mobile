//core
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//hooks
import { blackColorVar, localeVar } from '@utils/cache'

//icons
import { BackIcon, EditOrderIcon, RequestsIcon, TrashIcon } from '@common_components/Svg/Svg'
import { lightredColor } from '@utils/colors'

export const OrderClientMenuForm = ({
    setModalVisible,
    editOrder,
    setDeleteMenuShow,
    newRequests,
    setNewRequests,
}) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(blackColor)

    //handles
    const handleEditOrder = () => {
        setModalVisible(false)
        editOrder()
    }

    const handleOpenRequests = () => {
        setNewRequests(false)
        setModalVisible(false)
    }

    const handleDeleteOrder = () => {
        setDeleteMenuShow()
    }

    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>

            <View style={styles.items}>

                <TouchableOpacity
                    style={styles.item}
                    onPress={handleOpenRequests}
                >
                    <RequestsIcon width='30' height='25' fill={blackColor} />
                    <Text style={styles.text}>{locale.requests}</Text>
                    {newRequests ?
                        <View style={styles.newRequestsBadge} />
                        : null
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={handleEditOrder}
                >
                    <EditOrderIcon width='30' height='25' fill={blackColor} />
                    <Text style={styles.text}>{locale.edit}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.item}
                    onPress={handleDeleteOrder}
                >
                    <TrashIcon width='30' height='25' fill={blackColor} />
                    <Text style={styles.text}>{locale.delete}</Text>
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
    newRequestsBadge: {
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: lightredColor,
        right: 20,
        top: -5,
        borderRadius: 10,
    },
})
