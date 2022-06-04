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
import { ExecutorOrderRequests } from './ExecutorOrderRequests'
import { ExecutorWorkOrders } from './ExecutorWorkOrders'
import { ExecutorReadyOrders } from './ExecutorReadyOrders'

//colors
import { blueColor, lightgrayColor } from '@utils/colors'

export const ExecutorWorks = () => {

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

            <Tab.Group
                options={{
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                }}
            >

                <Tab.Screen name="ExecutorOrderRequests"
                    component={ExecutorOrderRequests}
                    options={{
                        title: locale.requests,
                    }}
                />

                <Tab.Screen name="ExecutorWorkOrders"
                    component={ExecutorWorkOrders}
                    options={{
                        title: locale.workText,
                    }}
                />

                <Tab.Screen name="ExecutorReadyOrders"
                    component={ExecutorReadyOrders}
                    options={{
                        title: locale.readyText,
                    }}
                />

            </Tab.Group>

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