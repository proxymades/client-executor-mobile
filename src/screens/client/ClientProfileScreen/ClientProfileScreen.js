//core
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useReactiveVar } from '@apollo/client'

//components
import { ClientProfile } from '@components/client/ClientProfile/ClientProfile'
import { ClientOrders } from '@components/client/ClientProfile/ClientOrders/ClientOrders'

//colors
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

export const ClientProfileScreen = () => {

    //stack
    const Stack = createNativeStackNavigator()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    return (
        <Stack.Navigator>

            <Stack.Screen
                name='ClientProfile'
                component={ClientProfile}
                options={{
                    title: locale.profile,
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                }}
            />

            <Stack.Screen
                name='ClientOrders'
                component={ClientOrders}
                options={{
                    title: locale.orders,
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                }}
            />

        </Stack.Navigator>
    )
}
