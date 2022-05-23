//core
import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//utils
import { isNotifedVar, localeVar, whiteColorVar } from '@utils/cache'

//components
// import { EditProfile } from '@components/Profile/EditProfile/EditProfile'

//screens
import { NavigationScreen } from '@screens/NavigationScreen/NavigationScreen'

//common components
import { Notify } from '@common_components/Notify/Notify'
import { Auth } from '@components/Auth/Auth'
import { Selector } from '@components/Auth/Selector'

export const AuthScreen = () => {

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
                        name="Selector"
                        component={Selector}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <Stack.Screen
                        name="Auth"
                        component={Auth}
                        options={({ route }) => ({
                            title: route.params.type === 'client' ? locale.client : locale.executor
                            // headerShown: false,
                        })}
                    />

                </Stack.Navigator>

            </NavigationContainer>

        </>
    )
}