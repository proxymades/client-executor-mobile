//core
import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//utils
import { blackColorVar, isNotifedVar, localeVar, whiteColorVar } from '@utils/cache'

//components
import { EditExecutorProfile } from '@components/executor/ExecutorProfile/EditExecutorProfile/EditExecutorProfile'

//screens
import { ExecutorNavigationScreen } from '@screens/executor/ExecutorNavigationScreen/ExecutorNavigationScreen'

//common components
import { Notify } from '@common_components/Notify/Notify'

export const ExecutorScreens = () => {

    //stack
    const Stack = createNativeStackNavigator()

    //hooks
    const isNotifed = useReactiveVar(isNotifedVar)

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //handles
    isNotifed !== '' && setTimeout(() => isNotifedVar(''), 3500)

    return (
        <>

            <StatusBar
                animated={true}
                backgroundColor={whiteColor}
                barStyle={whiteColor === '#fff' ? 'dark-content' : 'light-content'}
            />

            <NavigationContainer >

                <Stack.Navigator>

                    <Stack.Screen
                        name="ExecutorNavigationScreen"
                        component={ExecutorNavigationScreen}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <Stack.Group
                        screenOptions={{
                            headerStyle: { backgroundColor: whiteColor },
                            headerTitleStyle: { color: blackColor },
                            headerTintColor: blackColor,
                        }}
                    >

                        <Stack.Screen
                            name='EditExecutorProfile'
                            component={EditExecutorProfile}
                            options={{
                                title: locale.edition,
                            }}
                        />

                    </Stack.Group>

                </Stack.Navigator>

            </NavigationContainer>

            <Notify />

        </>
    )
}