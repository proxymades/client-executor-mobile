//core
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useReactiveVar } from '@apollo/client'

//components
import { ClientActivityContainer } from '@components/client/ClientActivity/ClientActivityContainer'
import { ClientOrder } from '@components/client/Order/ClientOrder'

//colors
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

export const ClientActivityScreen = () => {

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
                name='ClientActivityContainer'
                component={ClientActivityContainer}
                options={{
                    title: locale.notifications,
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                }}
            />

            <Stack.Screen
                name='ClientOrder'
                component={ClientOrder}
                options={({ route }) => ({
                    title: route.params.title,
                })}
            />

        </Stack.Navigator>
    )
}
