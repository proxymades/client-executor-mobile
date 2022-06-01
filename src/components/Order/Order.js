//core
import React, { useState, useEffect } from 'react'
import { ScrollView, View, Dimensions, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'

//hooks
import { useOrder } from '@hooks_query/order/useOrder'
import { useDeleteOrder } from '@hooks_mutation/order/useDeleteOrder'

//common components
import { Loader } from '@components/Common/Loaders/Loader'
import { ExtraModal } from '@components/Common/Modals/ExtraModal'
import { OrderClientMenuForm } from '@components/Common/Modals/Forms/OrderClientMenuForm'
import { DeleteMenuForm } from '@components/Common/Modals/Forms/DeleteMenuForm'

//utils
import { blackColorVar, isUserTypeVar, localeVar, whiteColorVar } from '@utils/cache'
import { IMAGES_URI } from '@utils/uri'

//icons
import { MenuIcon, UrgentIcon } from '@components/Common/Svg/Svg'

//colors
import { blueColor, lightblueColor, lightgrayColor } from '@utils/colors'

export const Order = ({ route }) => {

    //global hooks
    const navigation = useNavigation()

    //states
    const [orderMenuShow, setOrderMenuShow] = useState(false)
    const [deleteMenuShow, setDeleteMenuShow] = useState(false)
    const [deleting, setDeleting] = useState(false)

    //hooks
    const { orderLoading, orderData } = useOrder(route.params.orderId)
    const { deleteOrder } = useDeleteOrder(route.params.orderId)

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
                    onPress={handleOpenOrderMenu}
                >
                    {isUserTypeVar() === 'client' ?
                        <>
                            {deleting ?
                                <ActivityIndicator size='small' color={lightblueColor} />
                                :
                                <MenuIcon width={22} height={22} fill={blackColor} />
                            }
                        </>
                        : null
                    }
                </TouchableOpacity>
            ),
        })
    }, [navigation, whiteColor, blackColor, locale, deleting])

    //handles
    const handleOpenOrderMenu = () => {
        setOrderMenuShow(true)
    }

    const handleDeleteOrder = () => {
        setDeleting(true)
        deleteOrder()
        setOrderMenuShow(false)
    }

    if (orderLoading) return <Loader />

    return (

        <ScrollView
            keyboardShouldPersistTaps='handler'
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 10 }}
            showsVerticalScrollIndicator={false}
        >

            <View style={styles.item}>
                <Text style={styles.orderDate}>
                    {locale.orderDate} {dayjs(orderData.createdAt).format('DD.MM.YYYY')}
                </Text>
            </View>

            {orderData.urgent ?
                <View style={styles.urgentWrap}>
                    <UrgentIcon width={30} height={15} fill={blueColor} />
                    <Text style={styles.urgentText}>{locale.urgent}</Text>
                </View>
                : null
            }

            <View style={styles.item}>
                <Text style={styles.label}>{locale.category}</Text>
                <Text style={styles.text}>
                    {orderData.category === 'polygraphy' ?
                        locale.polygraphy :
                        orderData.category === 'outad' ?
                            locale.outad
                            : locale.souvenir
                    }
                </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>{locale.quantity}</Text>
                <Text style={styles.text}>
                    {orderData.count}
                </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>{locale.text}</Text>
                <Text style={styles.text}>
                    {orderData.text}
                </Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>{locale.location}</Text>
                <Text style={styles.text}>
                    {orderData.city === 'nursultan' ?
                        locale.nursultan :
                        orderData.city === 'karaganda' ?
                            locale.karaganda
                            : locale.almaty
                    }
                </Text>
            </View>

            {orderData.image ?
                <View style={styles.item}>
                    <Text style={styles.label}>{locale.photo}</Text>
                    <Image
                        style={styles.image}
                        source={{
                            uri: `${IMAGES_URI}${orderData.image}`,
                        }}
                    />

                </View>
                : null
            }

            <ExtraModal
                modalVisible={orderMenuShow}
                setModalVisible={setOrderMenuShow}
            >
                <OrderClientMenuForm
                    setModalVisible={setOrderMenuShow}
                    setDeleteMenuShow={setDeleteMenuShow}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={deleteMenuShow}
                setModalVisible={setDeleteMenuShow}
                isSubmenu={true}
            >
                <DeleteMenuForm
                    setModalVisible={setDeleteMenuShow}
                    label={locale.confirmOrderDeletion}
                    deleteAction={handleDeleteOrder}
                />
            </ExtraModal>

            <ExtraModal
                modalVisible={deleting}
                isEditing={true}
            >
                <View style={styles.blackWrap} />
            </ExtraModal>

        </ScrollView>
    )
}

const windowWidth = Dimensions.get('window').width

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        paddingVertical: 10,
    },
    urgentWrap: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    urgentText: {
        fontSize: 12,
        fontStyle: 'italic',
        color: blueColor,
        marginLeft: 5
    },
    image: {
        width: windowWidth - 20,
        aspectRatio: 1.5,
        resizeMode: 'contain',
        marginTop: 5,
    },
    item: {
        marginVertical: 10,
    },
    label: {
        textAlign: 'center',
        fontSize: 14,
        color: lightgrayColor,
    },
    text: {
        textAlign: 'center',
        fontSize: 14,
        color: blackColor,
    },
    orderDate: {
        textAlign: 'center',
        fontSize: 12,
        color: lightgrayColor,
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