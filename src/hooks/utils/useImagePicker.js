//core
import { useReactiveVar } from '@apollo/client'
import { Platform } from 'react-native'
import { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker'

//utils
import { localeVar } from '@utils/cache'

export const useImagePicker = (isAvatar, cameraRequest) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //states
    const [preview, setPreview] = useState({ image: '' })
    const [openImagePicker, setOpenImagePicker] = useState(false)

    if (!isAvatar) {
        if (openImagePicker) {
            if (cameraRequest === 'camera') {
                ImagePicker.openCamera({
                    compressImageMaxWidth: 1080,
                    compressImageMaxHeight: 1080,
                    width: Platform.OS === 'ios' ? 1080 : 0,
                    height: Platform.OS === 'ios' ? 1080 : 0,
                    cropping: true,
                    cropperToolbarTitle: locale.photoEditing,
                    compressImageQuality: 0.3,
                }).then(image => {
                    setOpenImagePicker(false)
                    setPreview({
                        ...preview,
                        image: image.path
                    })
                }).catch((err) => err && setOpenImagePicker(false))

            } else {
                ImagePicker.openPicker({
                    compressImageMaxWidth: 1080,
                    compressImageMaxHeight: 540,
                    width: Platform.OS === 'ios' ? 1080 : 0,
                    height: Platform.OS === 'ios' ? 1080 : 0,
                    cropping: true,
                    cropperToolbarTitle: locale.photoEditing,
                    compressImageQuality: 0.3,
                }).then(image => {
                    setOpenImagePicker(false)
                    setPreview({
                        ...preview,
                        image: image.path
                    })
                }).catch((err) => err && setOpenImagePicker(false))
            }
        }

    }

    if (isAvatar) {
        if (openImagePicker) {
            if (cameraRequest === 'camera') {
                ImagePicker.openCamera({
                    width: isAvatar ? 540 : 1080,
                    height: isAvatar ? 540 : isPanoram ? 540 : 1080,
                    cropping: true,
                    cropperToolbarTitle: locale.photoEditing,
                    compressImageQuality: 0.3,
                }).then(image => {
                    setOpenImagePicker(false)
                    setPreview({
                        ...preview,
                        image: image.path
                    })
                }).catch((err) => err && setOpenImagePicker(false))
            } else {
                ImagePicker.openPicker({
                    width: isAvatar ? 540 : 1080,
                    height: isAvatar ? 540 : 540,
                    cropping: true,
                    cropperToolbarTitle: locale.photoEditing,
                    compressImageQuality: 0.3,
                }).then(image => {
                    setOpenImagePicker(false)
                    setPreview({
                        ...preview,
                        image: image.path
                    })
                }).catch((err) => err && setOpenImagePicker(false))
            }
        }


    }

    return {
        setOpenImagePicker,
        preview,
        setPreview
    }
}

