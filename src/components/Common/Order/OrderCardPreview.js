//core
import React from 'react'
import { View, Text } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import dayjs from 'dayjs'

//utils
import {
    blackColorVar,
    localeVar,
    whiteColorVar
} from '@utils/cache'

//hooks

//components
import { OrderButton } from '../Buttons/OrderButton'

//icons
import { UrgentIcon } from '../Svg/Svg'

//colors
import { blueColor, lightgrayColor } from '@utils/colors'

export const OrderCardPreview = ({ item }) => {

    //hooks

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    return (

        <View style={styles.container}>

            <OrderButton>

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
                                        locale.karaganda
                                        : locale.almaty
                                }
                            </Text>
                        </View>
                    </View>

                    <View style={styles.items}>
                        <View style={styles.item}>
                            <Text style={styles.small}>{locale.quantity} - {item.count}</Text>
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
        justifyContent: 'space-between',
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
    normal: {
        fontSize: 16,
        color: blackColor,
    },
})