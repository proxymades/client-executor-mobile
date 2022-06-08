//core
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useReactiveVar } from '@apollo/client'

//components
import { ExecutorFeed } from '@components/executor/ExecutorFeed/ExecutorFeed'
import { ExecutorOrder } from '@components/executor/ExecutorOrder/ExecutorOrder'

//colors
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

export const ExecutorFeedScreen = () => {

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
                    name='ExecutorFeed'
                    component={ExecutorFeed}
                    options={{
                        title: locale.orders,
                    }}
                />

                <Stack.Screen
                    name='ExecutorOrder'
                    component={ExecutorOrder}
                    options={({ route }) => ({
                        title: route.params.title,
                    })}
                />

            </Stack.Group>

        </Stack.Navigator>
    )
}
