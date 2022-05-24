//core
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useReactiveVar } from '@apollo/client'

//components
import { ClientProfile } from '@components/client/ClientProfile/ClientProfile'

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
                name='ClientProfile'
                component={ClientProfile}
                options={{
                    title: locale.notifications,
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                }}
            />

        </Stack.Navigator>
    )
}
