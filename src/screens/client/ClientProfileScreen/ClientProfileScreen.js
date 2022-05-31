//core
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useReactiveVar } from '@apollo/client'

//components
import { ClientProfile } from '@components/client/ClientProfile/ClientProfile'
import { ClientOrders } from '@components/client/ClientProfile/ClientOrders/ClientOrders'
import { Order } from '@components/Order/Order'

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

            <Stack.Group
                options={{
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                }}
            >


                <Stack.Screen
                    name='ClientProfile'
                    component={ClientProfile}
                    options={{
                        title: locale.profile,
                    }}
                />

                <Stack.Screen
                    name='ClientOrders'
                    component={ClientOrders}
                    options={{
                        title: locale.orders,
                    }}
                />

                <Stack.Screen
                    name='Order'
                    component={Order}
                    options={({ route }) => ({
                        title: route.params.title,
                    })}
                />

            </Stack.Group>

        </Stack.Navigator>
    )
}
