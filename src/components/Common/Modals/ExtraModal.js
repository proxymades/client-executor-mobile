//core
import React from 'react'
import { View, TouchableOpacity, Modal } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, whiteColorVar } from '@utils/cache'

export const ExtraModal = ({ children, modalVisible, setModalVisible, isEditing }) => {

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleCloseModal = () => {
        setModalVisible(false)
    }

    return (
        <>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
                onDismiss={handleCloseModal}
                statusBarTranslucent={true}
                animationType='fade'
            >
                <TouchableOpacity
                    onPress={handleCloseModal}
                    style={styles.blackWrap}
                    disabled={isEditing}
                />
                <View style={styles.modalView}>
                    {children}
                </View>
            </Modal>

        </>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    blackWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blackColor,
        opacity: 0.2,
    },
    modalView: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: whiteColor,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: blackColor,
        elevation: 5,
        zIndex: 2,
        position: 'absolute',
        top: 80
    },
})