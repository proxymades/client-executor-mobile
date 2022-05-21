//core
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useReactiveVar } from '@apollo/client'

//components
import { Profile } from '@components/Profile/Profile'

//colors
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

export const ProfileScreen = () => {

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
                name='Profile'
                component={Profile}
                options={{
                    title: locale.profile,
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                }}
            />

        </Stack.Navigator>
    )
}
