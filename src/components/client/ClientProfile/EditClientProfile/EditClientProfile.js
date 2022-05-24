//core
import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, TouchableOpacity, RefreshControl, } from 'react-native'

//common components
import { ExtraModal } from '@common_components/Modals/ExtraModal'
import { EditProfileAvatarForm } from '@common_components/Modals/Forms/EditProfileAvatarForm'

//hooks
import { useImagePicker } from '@hooks_utils/useImagePicker'
import { useReactiveVar } from '@apollo/client'
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'
import { ProfilePhoto } from '@components/Common/Profile/ProfilePhoto'

export const EditClientProfile = () => {

    //states
    const [extraAvatarShow, setExtraAvatarShow] = useState(false)
    const [pickerType, setPickerType] = useState('')

    //hooks
    const { setOpenImagePicker, preview, setPreview } = useImagePicker(true, pickerType)

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleExtraAvatarShow = () => {
        setExtraAvatarShow(true)
    }

    const handleDeleteAvatar = () => {
        setPreview({
            ...preview,
            image: ''
        })
        setFormState({
            ...formState,
            avatar: ''
        })
        deleteAvatar()
    }

    return (
        <View style={styles.container}>

            <ProfilePhoto
                size={18}
                action={handleExtraAvatarShow}
                avatar={clientProfileData.avatar}
                preview={preview}
            />


            {/* <ExtraModal
                modalVisible={extraAvatarShow}
                setModalVisible={setExtraAvatarShow}
            >
                <EditProfileAvatarForm
                    existAvatar={clientProfileData.avatar}
                    deleteAvatar={handleDeleteAvatar}
                    openImagePicker={setOpenImagePicker}
                    setPickerType={setPickerType}
                    setModalVisible={setExtraAvatarShow}
                />
            </ExtraModal> */}

        </View>
    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        alignItems: 'center',
        paddingTop: '30%'
    },
})