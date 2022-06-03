//core
import React, { useState, useEffect } from 'react'
import { ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

//hooks
import { useCreateOrder } from '@hooks_mutation/order/useCreateOrder'

//common components
import { ExtraModal } from '@components/Common/Modals/ExtraModal'
import { InputMultiline } from '@components/Common/Inputs/InputMultiline'
import { PickerLine } from '@components/Common/Inputs/PickerLine'
import { SwitchLine } from '@components/Common/Inputs/SwitchLine'
import { OrderImage } from '@components/Common/Order/OrderImage'
import { InputLine } from '@components/Common/Inputs/InputLine'
import { EditImageForm } from '@components/Common/Modals/Forms/EditImageForm'

//utils
import { blackColorVar, isNotifedVar, localeVar, whiteColorVar } from '@utils/cache'
import { IS_COIUNT_NUMBERS } from '@utils/regulars'
import { useImagePicker } from '@hooks_utils/useImagePicker'

//icons
import { AcceptIcon } from '@components/Common/Svg/Svg'

//colors
import { blueColor, lightblueColor, lightgrayColor } from '@utils/colors'

export const CreateOrder = () => {

    //global hooks
    const navigation = useNavigation()

    //states
    const [formState, setFormState] = useState({
        header: '',
        category: 'polygraphy',
        count: '',
        text: '',
        city: 'nursultan',
        urgent: false,
        image: '',
    })
    const [pickerType, setPickerType] = useState('')
    const [extraImageShow, setExtraImageShow] = useState(false)
    const [creating, setCreating] = useState(false)

    //hooks
    const { setOpenImagePicker, preview, setPreview } = useImagePicker(false, pickerType)
    const { createOrder } = useCreateOrder(formState)

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
                    disabled={creating}
                >
                    {creating ?
                        <ActivityIndicator size='small' color={lightblueColor} />
                        :
                        <AcceptIcon width={22} height={22} fill={!creating ? blueColor : lightgrayColor} />
                    }
                </TouchableOpacity>
            ),
        })
    }, [navigation, formState, preview.image, creating, whiteColor, blackColor, locale])

    useEffect(() => {
        preview &&
            setFormState({
                ...formState,
                image: preview.image
            })
    }, [preview.image])

    useEffect(() => {
        creating &&
            createOrder()
    }, [creating])

    //handles
    const handleInputFormChange = (value, name) => {
        const list = { ...formState }
        list[name] = value
        setFormState(list)
    }

    const handleOpenEditImage = () => {
        setExtraImageShow(true)
    }

    const handleDeletePreview = () => {
        setPreview('')
        setFormState({
            ...formState,
            image: ''
        })
    }

    const handleCheckData = () => {
        formState.header === '' ?
            isNotifedVar(`${locale.checkField_notify} - ${locale.header}`) :
            formState.count === '' && formState.count.match(IS_COIUNT_NUMBERS) === null ?
                isNotifedVar(`${locale.checkField_notify} - ${locale.quantity}`) :
                formState.text === '' ?
                    isNotifedVar(`${locale.checkField_notify} - ${locale.text}`) :
                    setCreating(true)
    }

    return (

        <ScrollView
            keyboardShouldPersistTaps='handler'
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 80 }}
            nestedScrollEnabled={true}
        >

            <InputLine
                inputChange={e => handleInputFormChange(e, 'header')}
                input={formState.header}
                symbols={30}
                placeholder={locale.add_placeholder}
                label={locale.header}
            />

            <PickerLine
                inputChange={e => handleInputFormChange(e, 'category')}
                input={formState.category}
                label={locale.category}
                pickerType='category'
            />

            <InputLine
                inputChange={e => handleInputFormChange(e, 'count')}
                input={formState.count}
                placeholder={locale.addCount_placeholder}
                label={locale.quantity}
                isNumeric={true}
            />

            <InputMultiline
                inputChange={e => handleInputFormChange(e, 'text')}
                input={formState.text}
                symbols={200}
                placeholder={locale.add_placeholder}
                label={locale.text}
            />

            <PickerLine
                inputChange={e => handleInputFormChange(e, 'city')}
                input={formState.city}
                label={locale.location}
                pickerType='location'
            />

            <SwitchLine
                input={formState.urgent}
                inputChange={e => handleInputFormChange(e, 'urgent')}
                positive={locale.urgentOrderYes}
                negative={locale.urgentOrderNo}
            />

            <OrderImage
                action={handleOpenEditImage}
                preview={preview.image}
                image={formState.image}
                setImage={handleDeletePreview}
            />

            <ExtraModal
                modalVisible={extraImageShow}
                setModalVisible={setExtraImageShow}
            >
                <EditImageForm
                    openImagePicker={setOpenImagePicker}
                    setPickerType={setPickerType}
                    setModalVisible={setExtraImageShow}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={creating}
                isEditing={true}
            >
                <View style={styles.blackWrap} />
            </ExtraModal>

        </ScrollView>
    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        paddingVertical: 10,
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