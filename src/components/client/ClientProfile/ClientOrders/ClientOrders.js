//core
import React from 'react'
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
import { ClientNewOrders } from './ClientNewOrders'
import { ClientWorkOrders } from './ClientWorkOrders'
import { ClientReadyOrders } from './ClientReadyOrders'

//colors
import { blueColor, lightgrayColor } from '@utils/colors'

export const ClientOrders = () => {

    //tabs
    const Tab = createMaterialTopTabNavigator()

    //hooks

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles()

    return (
        <Tab.Navigator
            style={{
                backgroundColor: whiteColor
            }}
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: 'capitalize',
                    fontSize: 14,
                    backgroundColor: whiteColor
                },
                tabBarIndicatorStyle: {
                    color: whiteColor,
                    backgroundColor: lightgrayColor,
                    marginBottom: 5,
                    height: 0.5,
                },
                tabBarStyle: {
                    elevation: 0,
                    paddingTop: 20,
                    color: blackColor,
                    backgroundColor: whiteColor,
                    marginHorizontal: 10
                },
                tabBarPressColor: whiteColor,
                tabBarInactiveTintColor: lightgrayColor,
                tabBarActiveTintColor: blueColor
            }}
        >

            <Tab.Screen name="ClientNewOrders"
                component={ClientNewOrders}
                options={{
                    title: locale.newText,
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                }}
            />

            <Tab.Screen name="ClientWorkOrders"
                component={ClientWorkOrders}
                options={{
                    title: locale.workText,
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                }}
            />

            <Tab.Screen name="ClientReadyOrders"
                component={ClientReadyOrders}
                options={{
                    title: locale.readyText,
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                }}
            />

        </Tab.Navigator>
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