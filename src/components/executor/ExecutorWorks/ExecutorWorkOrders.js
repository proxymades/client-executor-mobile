//core
import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useReactiveVar } from '@apollo/client'

//utils
import {
    blackColorVar,
    localeVar,
    whiteColorVar
} from '@utils/cache'

//hooks

//components

//colors
import { blueColor, lightgrayColor } from '@utils/colors'


export const ExecutorWorkOrders = () => {


    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles()

    return (
        <>
            <Text>WORK orders</Text>
        </>
    )
}

const getStyles = () => ({
    badge: {
        backgroundColor: blueColor,
        marginRight: '25%',
        height: 10,
        width: 10,
        borderRadius: 20,
        marginTop: 10
    }
})