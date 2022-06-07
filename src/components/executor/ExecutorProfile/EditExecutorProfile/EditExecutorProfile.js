//core
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { ReactNativeFile } from 'apollo-upload-client'
import { useNavigation } from '@react-navigation/native'

//common components
import { ExtraModal } from '@common_components/Modals/ExtraModal'
import { EditImageForm } from '@common_components/Modals/Forms/EditImageForm'
import { ProfilePhoto } from '@common_components/Profile/ProfilePhoto'
import { InputLine } from '@common_components/Inputs/InputLine'
import { ProfilePhone } from '@common_components/Profile/ProfilePhone'

//hooks
import { useUploadExecutorAvatar } from '@hooks_mutation/executor/profile/useUploadExecutorAvatar'
import { useUpdateExecutorProfile } from '@hooks_mutation/executor/profile/useUpdateExecutorProfile'
import { useDeleteExecutorAvatar } from '@hooks_mutation/executor/profile/useDeleteExecutorAvatar'
import { useExecutorProfileCache } from '@hooks_query/executor/profile/useExecutorProfileCache'

//utils
import { useImagePicker } from '@hooks_utils/useImagePicker'
import { blackColorVar, isNotifedVar, localeVar, whiteColorVar } from '@utils/cache'

//icons
import { AcceptIcon } from '@common_components/Svg/Svg'

//colors
import { blueColor, lightblueColor, lightgrayColor } from '@utils/colors'

export const EditExecutorProfile = () => {

    //states
    const [extraAvatarShow, setExtraAvatarShow] = useState(false)
    const [pickerType, setPickerType] = useState('')
    const [updating, setUpdating] = useState(false)
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        avatar: '',
    })

    //global hooks
    const navigation = useNavigation()

    //hooks
    const { profileQuery } = useExecutorProfileCache()
    const { setOpenImagePicker, preview, setPreview } = useImagePicker(true, pickerType)
    const { uploadExecutorAvatar } = useUploadExecutorAvatar()
    const { updateExecutorProfile } = useUpdateExecutorProfile(preview, formState)
    const { deleteExecutorAvatar } = useDeleteExecutorAvatar()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //effects
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={styles.accept}
                    onPress={handleCheckData}
                    disabled={updating}
                >
                    {updating ?
                        <ActivityIndicator size='small' color={lightblueColor} />
                        :
                        <AcceptIcon width={22} height={22} fill={!updating ? blueColor : lightgrayColor} />
                    }
                </TouchableOpacity>
            ),
        })
    }, [navigation, formState, preview.image, updating, whiteColor, blackColor, locale])

    useEffect(() => {
        profileQuery &&
            setFormState({
                ...formState,
                name: profileQuery.executorProfile.name,
                avatar: profileQuery.executorProfile.avatar,
                phone: profileQuery.executorProfile.phone,
            })
    }, [profileQuery])

    useEffect(() => {
        if (updating) {
            Keyboard.dismiss()
            handleUpdateProfile()
        }
    }, [updating])

    //handles
    const handleExtraAvatarShow = () => {
        setExtraAvatarShow(true)
    }

    const handleInputFormChange = (value, name) => {
        const list = { ...formState }
        list[name] = value
        setFormState(list)
    }

    const handleCheckData = () => {
        formState.name === '' ?
            isNotifedVar(locale.field_warning) :
            setUpdating(true)
    }

    const handleUpdateProfile = () => {
        try {
            if (preview.image) {
                const file = new ReactNativeFile({
                    uri: preview.image,
                    name: 'file.jpg',
                    type: 'image/jpeg',
                })
                setTimeout(() => uploadExecutorAvatar(file), 300)
            }
        }
        finally {
            updateExecutorProfile(formState.name, preview.image, formState.avatar)
        }
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
        deleteExecutorAvatar()
    }

    return (
        <View style={styles.container}>

            <ProfilePhoto
                size={80}
                action={handleExtraAvatarShow}
                avatar={formState.avatar}
                preview={preview}
                isEdit={true}
            />

            <InputLine
                inputChange={e => handleInputFormChange(e, 'name')}
                input={formState.name}
                symbols={30}
                placeholder={locale.name_placeholder}
                label={locale.name}
            />

            <ProfilePhone phoneNumber={formState.phone} />

            <ExtraModal
                modalVisible={extraAvatarShow}
                setModalVisible={setExtraAvatarShow}
            >
                <EditImageForm
                    existImage={profileQuery.executorProfile.avatar}
                    deleteImage={handleDeleteAvatar}
                    openImagePicker={setOpenImagePicker}
                    setPickerType={setPickerType}
                    setModalVisible={setExtraAvatarShow}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={updating}
                isEditing={true}
            />

        </View>
    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        alignItems: 'center',
        paddingTop: '10%',
    },
    accept: {
        paddingLeft: 10,
        paddingRight: 5,
    },
    blackWrap: {
        width: '100%',
        height: '100%',
        zIndex: 3,
        position: 'absolute',
        backgroundColor: blackColor,
        opacity: 0.4
    },
})