//core
import React, { useState, useEffect } from 'react'
import { ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

//hooks
import { useClientOrderCache } from '@hooks_query/client/order/useClientOrderCache'
import { useUpdateOrder } from '@hooks_mutation/client/order/useUpdateOrder'
import { useDeleteOrderImage } from '@hooks_mutation/client/order/useDeleteOrderImage'

//components

//common components
import { ExtraModal } from '@components/Common/Modals/ExtraModal'
import { InputLine } from '@components/Common/Inputs/InputLine'
import { PickerLine } from '@components/Common/Inputs/PickerLine'
import { InputMultiline } from '@components/Common/Inputs/InputMultiline'
import { SwitchLine } from '@components/Common/Inputs/SwitchLine'
import { OrderImage } from '@components/Common/Order/OrderImage'
import { EditImageForm } from '@components/Common/Modals/Forms/EditImageForm'

//utils
import { blackColorVar, isNotifedVar, localeVar, whiteColorVar } from '@utils/cache'
import { useImagePicker } from '@hooks_utils/useImagePicker'
import { IS_COIUNT_NUMBERS } from '@utils/regulars'

//icons
import { AcceptIcon } from '@components/Common/Svg/Svg'

//colors
import { blueColor, lightblueColor, lightgrayColor } from '@utils/colors'

export const EditOrder = ({ route }) => {

    //global hooks
    const navigation = useNavigation()

    //states
    const [formState, setFormState] = useState({
        header: '',
        category: '',
        count: '',
        text: '',
        city: '',
        urgent: false,
        image: '',
    })
    const [pickerType, setPickerType] = useState('')
    const [extraImageShow, setExtraImageShow] = useState(false)
    const [updating, setUpdating] = useState(false)

    //hooks
    const { orderQuery } = useClientOrderCache(route.params.orderId)
    const { setOpenImagePicker, preview, setPreview } = useImagePicker(false, pickerType)
    const { deleteOrderImage } = useDeleteOrderImage(route.params.orderId)
    const { updateOrder } = useUpdateOrder(formState, preview, route.params.orderId)

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
        setFormState({
            ...formState,
            header: orderQuery.getClientOrder.header,
            category: orderQuery.getClientOrder.category,
            count: orderQuery.getClientOrder.count,
            text: orderQuery.getClientOrder.text,
            city: orderQuery.getClientOrder.city,
            urgent: orderQuery.getClientOrder.urgent,
            image: orderQuery.getClientOrder.image,
        })
    }, [orderQuery])

    useEffect(() => {
        preview.image !== '' &&
            setFormState({
                ...formState,
                image: preview.image
            })
    }, [preview.image])

    useEffect(() => {
        updating &&
            updateOrder()
    }, [updating])

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

    const handleDeleteImage = () => {
        setFormState({
            ...formState,
            image: ''
        })
        deleteOrderImage()
    }

    const handleCheckData = () => {
        formState.header === '' ?
            isNotifedVar(`${locale.checkField_notify} - ${locale.header}`) :
            formState.count === '' && formState.count.match(IS_COIUNT_NUMBERS) === null ?
                isNotifedVar(`${locale.checkField_notify} - ${locale.quantity}`) :
                formState.text === '' ?
                    isNotifedVar(`${locale.checkField_notify} - ${locale.text}`) :
                    setUpdating(true)
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
            />

            <OrderImage
                action={handleOpenEditImage}
                preview={preview.image}
                image={formState.image}
                setImage={handleDeletePreview}
                isEdit={true}
            />

            <ExtraModal
                modalVisible={extraImageShow}
                setModalVisible={setExtraImageShow}
            >
                <EditImageForm
                    existImage={orderQuery.getClientOrder.image}
                    deleteImage={handleDeleteImage}
                    openImagePicker={setOpenImagePicker}
                    setPickerType={setPickerType}
                    setModalVisible={setExtraImageShow}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={updating}
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