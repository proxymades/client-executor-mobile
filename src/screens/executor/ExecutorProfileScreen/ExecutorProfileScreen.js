//core
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useReactiveVar } from '@apollo/client'

//components
import { ExecutorProfile } from '@components/executor/ExecutorProfile/ExecutorProfile'
import { ExecutorWorks } from '@components/executor/ExecutorWorks/ExecutorWorks'
import { ExecutorOrder } from '@components/executor/ExecutorOrder/ExecutorOrder'

//common components
import { Settings } from '@components/Common/Settings/Settings'

//colors
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'


export const ExecutorProfileScreen = () => {

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
                screenOptions={{
                    headerStyle: { backgroundColor: whiteColor },
                    headerTitleStyle: { color: blackColor },
                    headerTintColor: blackColor,
                }}
            >

                <Stack.Screen
                    name='ExecutorProfile'
                    component={ExecutorProfile}
                    options={{
                        title: locale.executor,
                    }}
                />

                <Stack.Screen
                    name='ExecutorWorks'
                    component={ExecutorWorks}
                    options={{
                        title: locale.works,
                    }}
                />

                <Stack.Screen
                    name='ExecutorOrder'
                    component={ExecutorOrder}
                    options={({ route }) => ({
                        title: route.params.title,
                    })}
                />

                <Stack.Screen
                    name='Settings'
                    component={Settings}
                    options={{
                        title: locale.settings,
                    }}
                />

            </Stack.Group>

        </Stack.Navigator>
    )
}
