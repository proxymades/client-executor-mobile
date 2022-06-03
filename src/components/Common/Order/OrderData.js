//core
import React from 'react'
import { ScrollView, View, Dimensions, Image, Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import dayjs from 'dayjs'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'
import { IMAGES_URI } from '@utils/uri'

//icons
import { UrgentIcon } from '@components/Common/Svg/Svg'

//colors
import { blueColor, lightgrayColor } from '@utils/colors'

export const OrderData = ({ orderData, children }) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    return (

        <>

            <ScrollView
                keyboardShouldPersistTaps='handler'
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
                showsVerticalScrollIndicator={false}
            >

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

                {children}

            </ScrollView>

            <View style={styles.itemFixedBottom}>
                <Text style={styles.orderDate}>
                    {locale.orderDate} {dayjs(orderData.createdAt).format('DD.MM.YYYY')}
                </Text>
            </View>
        </>
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
        aspectRatio: 1,
        marginTop: 5,
        borderRadius: 10,

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
    itemFixedBottom: {
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
        borderRadius: 20,
        elevation: 8,
        shadowColor: lightgrayColor,
        backgroundColor: whiteColor,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
})