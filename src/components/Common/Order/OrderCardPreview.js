//core
import React from 'react'
import { View, Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'

//utils
import {
    blackColorVar,
    isUserTypeVar,
    localeVar,
    whiteColorVar
} from '@utils/cache'

//components
import { OrderButton } from '../Buttons/OrderButton'

//icons
import { UrgentIcon } from '../Svg/Svg'

//colors
import { blueColor, lightgrayColor } from '@utils/colors'

export const OrderCardPreview = ({ item }) => {

    //global hooks
    const navigation = useNavigation()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleOpenOrder = () => {
        navigation.push(isUserTypeVar() === 'client' ? 'ClientOrder' : 'ExecutorOrder', { orderId: item.id, title: item.header })
    }

    return (

        <View style={styles.container}>

            <OrderButton
                handleAction={handleOpenOrder}
            >

                <View style={styles.wrap}>

                    <View style={styles.items}>

                        <View style={styles.item}>
                            <Text style={styles.small}>
                                {item.category === 'polygraphy' ?
                                    locale.polygraphy :
                                    item.category === 'outad' ?
                                        locale.outad
                                        : locale.souvenir
                                }
                            </Text>
                        </View>

                        {item.urgent ?
                            <UrgentIcon width={25} height={15} fill={blueColor} />
                            : null
                        }

                    </View>

                    <View style={styles.items}>

                        <View style={styles.item}>
                            <Text style={styles.normal}>{item.header}</Text>
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.small}>
                                {item.city === 'nursultan' ?
                                    locale.nursultan :
                                    item.city === 'karaganda' ?
                                        locale.karaganda :
                                        item.city === 'almaty' ?
                                            locale.almaty :
                                            item.city === 'atyrau' ?
                                                locale.atyrau
                                                : null
                                }
                            </Text>
                        </View>

                    </View>

                    <View style={styles.items}>

                        <View style={styles.item}>
                            <Text style={styles.medium}>{locale.quantity} - {item.count}</Text>
                        </View>

                        <View style={styles.item}>
                            <Text style={styles.small}>{dayjs(item.createdAt).format('DD.MM.YYYY')}</Text>
                        </View>

                    </View>

                </View>

            </OrderButton>

        </View>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    wrap: {
        justifyContent: 'space-around',
        height: 70
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
    },
    small: {
        fontSize: 12,
        color: lightgrayColor,
    },
    medium: {
        fontSize: 13,
        color: lightgrayColor,
    },
    normal: {
        fontSize: 16,
        color: blackColor,
    },
})