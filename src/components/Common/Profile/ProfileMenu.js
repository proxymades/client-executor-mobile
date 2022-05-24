//core
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, RefreshControl, } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//icons
import { OrdersIcon, RatingIcon, ReviewsIcon, WorksIcon } from '../Svg/Svg'

export const ProfileMenu = ({ ordersCount, worksCount, ratingCount, reviewsCount, type }) => {

    //states

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    return (
        <View style={styles.container}>

            <View style={styles.items}>
                <View style={styles.item}>
                    {type === 'client' ?
                        <>
                            <OrdersIcon width={40} height={40} fill={blackColor} />
                            <Text style={styles.text}>{locale.orders}</Text>
                            <Text style={styles.count}>{ordersCount}</Text>
                        </>
                        :
                        <>
                            <WorksIcon width={40} height={40} fill={blackColor} />
                            <Text style={styles.text}>{locale.works}</Text>
                            <Text style={styles.count}>{worksCount}</Text>
                        </>
                    }
                </View>
                <View style={styles.item}>
                    <RatingIcon width={60} height={40} fill={blackColor} />
                    <Text style={styles.text}>{locale.rating}</Text>
                    <Text style={styles.count}>{ratingCount}</Text>
                </View>
                <View style={styles.item}>
                    <ReviewsIcon width={40} height={40} fill={blackColor} />
                    <Text style={styles.text}>{locale.reviews}</Text>
                    <Text style={styles.count}>{reviewsCount}</Text>
                </View>

            </View>

        </View>
    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        alignItems: 'center',
        width: '100%',
        marginTop: 40,
    },
    items: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignSelf: 'center'
    },
    item: {
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: blackColor,
        textAlign: 'center',
    },
    count: {
        fontSize: 16,
        color: blackColor,
        textAlign: 'center',
    },
})