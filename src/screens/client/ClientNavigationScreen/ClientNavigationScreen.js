//core
import React from 'react'
import { useReactiveVar } from '@apollo/client'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dimensions } from 'react-native'

//screens
import { ClientProfileScreen } from '@screens/client/ClientProfileScreen/ClientProfileScreen'
import { ClientActivityScreen } from '@screens/client/ClientActivityScreen/ClientActivityScreen'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//icons
import {
    AvatarIcon,
    ActivityIcon,
} from '@common_components/Svg/Svg'

//colors
import { blueColor } from '@utils/colors'

export const ClientNavigationScreen = () => {

    //tabs
    const Tab = createBottomTabNavigator()

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor)

    return (

        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    color: blackColor,
                    backgroundColor: whiteColor
                },
                tabBarActiveTintColor: blackColor,
                // tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
            }}
        >

            <Tab.Screen
                name='ClientProfileScreen'
                component={ClientProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AvatarIcon width={size} height={size} fill={color} />
                    ),
                    tabBarLabel: locale.profile,
                    tabBarLabelStyle: { paddingBottom: 3 },
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name='ClientActivityScreen'
                component={ClientActivityScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ActivityIcon width={size} height={size} fill={color} />
                    ),
                    tabBarLabel: locale.notifications,
                    tabBarLabelStyle: { paddingBottom: 3 },
                    headerShown: false,
                }}
            />

        </Tab.Navigator>

    )
}

const windowWidth = Dimensions.get('window').width

const getStyles = (whiteColor) => ({
    newsDot: {
        position: 'absolute',
        right: -9,
        top: -5,
        height: 18,
        width: 18,
        backgroundColor: blueColor,
        borderRadius: 44,
        justifyContent: 'center'
    },
    newsActivityDot: {
        position: 'absolute',
        right: -5,
        top: -3,
        height: 10,
        width: 10,
        backgroundColor: blueColor,
        borderRadius: 44,
        justifyContent: 'center'
    },
    newsDotCount: {
        textAlign: 'center',
        fontSize: 9,
        color: whiteColor,
    },
    newsPopupContainer: {
        position: 'absolute',
        width: windowWidth,
        right: 0,
        left: -40 - windowWidth / 2,
        top: -55,
    },
    newsPopup: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 5,
        backgroundColor: blueColor,
        borderRadius: 20,
        alignSelf: 'center',
    },
    newsIcon: {
        width: 25,
        alignSelf: 'center',
        marginHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    newsCount: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        color: whiteColor,
        fontSize: 14,
    },
})