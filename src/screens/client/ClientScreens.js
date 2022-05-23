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
                        name="NavigationScreen"
                        component={NavigationScreen}
                        options={{
                            headerShown: false,
                        }}
                    />

                    <Stack.Group>

                        {/* <Stack.Screen
                            name='EditProfile'
                            component={EditProfile}
                            options={{
                                title: locale.edition,
                            }}
                        /> */}

                    </Stack.Group>

                </Stack.Navigator>

            </NavigationContainer>

            <Notify />

        </>
    )
}