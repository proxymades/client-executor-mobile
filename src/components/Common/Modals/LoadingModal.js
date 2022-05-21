//core
import React from 'react'
import { Modal } from 'react-native'

export const LoadingModal = ({ children, modalVisible }) => {

    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            animationType='fade'
            statusBarTranslucent={true}
        >
            {children}
        </Modal>
    )
}