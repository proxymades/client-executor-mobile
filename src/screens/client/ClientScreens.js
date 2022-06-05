//core
import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//utils
import { isNotifedVar, localeVar, whiteColorVar } from '@utils/cache'

//components
import { EditClientProfile } from '@components/client/ClientProfile/EditClientProfile/EditClientProfile'
import { CreateOrder } from '@components/client/ClientOrder/CreateOrder'
import { EditOrder } from '@components/client/ClientOrder/EditOrder'

//screens
import { ClientNavigationScreen } from '@screens/client/ClientNavigationScreen/ClientNavigationScreen'

//common components
import { Notify } from '@common_components/Notify/Notify'

export const ClientScreens = () => {

    //stack
    const Stack = createNativeStackNavigator()

    //hooks
    const isNotifed = useReactiveVar(isNotifedVar)

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)

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
                        name="ClientNavigationScreen"
                        component={ClientNavigationScreen}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <Stack.Group>

                        <Stack.Screen
                            name='EditClientProfile'
                            component={EditClientProfile}
                            options={{
                                title: locale.edition,
                            }}
                        />

                        <Stack.Screen
                            name='CreateOrder'
                            component={CreateOrder}
                            options={{
                                title: locale.creation,
                            }}
                        />

                        <Stack.Screen
                            name='EditOrder'
                            component={EditOrder}
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