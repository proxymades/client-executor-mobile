//core
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useApolloClient, useReactiveVar } from '@apollo/client'
import { useColorScheme, Keyboard } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import jwt_decode from 'jwt-decode'
import messaging from '@react-native-firebase/messaging'

//screens
import { ClientScreens } from '@screens/client/ClientScreens'
import { ExecutorScreens } from '@screens/executor/ExecutorScreens'
import { AuthScreen } from '@screens/AuthScreen'

//hooks_utils
import { useLanguage } from '@hooks_utils/useLanguage'

//gql
import { CLIENT_ACTIVITY } from '@gql_query/client/activity/ClientActivity'

//utils
import {
  isLoggedInVar,
  isUserPhoneVar,
  isUserTypeVar,
  isUserIdVar,
  isTokenVar,
  whiteColorVar,
  blackColorVar,
  darkblueColorVar,
  lightengrayColorVar,
  isKeyboardHeightVar,
  localeVar,
  isNotifedVar,
} from '@utils/cache'

export const App = () => {

  //global hooks
  const colorScheme = useColorScheme()
  const [token, setToken] = useMMKVString('token')
  const [theme, setTheme] = useMMKVString('theme')
  const [language, setLanguage] = useMMKVString('language')
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const isUserType = useReactiveVar(isUserTypeVar)
  const { lang } = useLanguage()
  const client = useApolloClient()

  //states
  const [loading, setLoading] = useState(true)

  //effects
  useEffect(() => {
    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    })
  }, [])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      isNotifedVar(remoteMessage.notification.body)
      if (remoteMessage.data.type === 'request') {
        const query = client.readQuery({
          query: CLIENT_ACTIVITY
        })
        query !== null &&
          client.refetchQueries({
            include: ['ClientActivity']
          })
      }
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      if (remoteMessage.data.type === 'request') {
        const query = client.readQuery({
          query: CLIENT_ACTIVITY
        })
        query !== null &&
          client.refetchQueries({
            include: ['ClientActivity']
          })
      }
    })
  }, [])

  useEffect(() => {
    if (token) {
      setLoading(false)
      isLoggedInVar(true)
      isUserPhoneVar(jwt_decode(token).phone)
      isUserTypeVar(jwt_decode(token).type)
      isUserIdVar(jwt_decode(token).id)
      isTokenVar(token)
    } else {
      setLoading(false)
      isLoggedInVar(false)
    }
  }, [token])

  useEffect(() => {
    if (theme) {
      if (theme === 'light') {
        whiteColorVar('#fff')
        blackColorVar('#282C34')
        darkblueColorVar('#001fa8')
        lightengrayColorVar('#F3F3F3')
      } else {
        whiteColorVar('#282C34')
        blackColorVar('#fff')
        darkblueColorVar('#3074FC')
        lightengrayColorVar('#333')
      }
    } else {
      if (colorScheme === 'light') {
        whiteColorVar('#fff')
        blackColorVar('#282C34')
        darkblueColorVar('#001fa8')
        lightengrayColorVar('#F3F3F3')
      } else {
        whiteColorVar('#282C34')
        blackColorVar('#fff')
        darkblueColorVar('#3074FC')
        lightengrayColorVar('#333')
      }
    }
  }, [theme, colorScheme])

  useEffect(() => {
    localeVar(lang)
  }, [language])

  useEffect(() => {
    const keyboardOpened = Keyboard.addListener('keyboardDidShow', (e) => {
      isKeyboardHeightVar(e.endCoordinates.height);
    })
    return () => keyboardOpened.remove()
  }, [Keyboard])

  useEffect(() => {
    const keyboardClosed = Keyboard.addListener('keyboardDidHide', (e) => {
      isKeyboardHeightVar(e.endCoordinates.height);
    })
    return () => keyboardClosed.remove()
  }, [Keyboard])

  //handles
  const saveTokenToDatabase = (token) => {
    // Assume user is already signed in

    console.log(token)
  }

  return (
    <SafeAreaProvider>
      {!loading && isLoggedIn ?
        <>
          {isUserType === 'client' ?
            <ClientScreens />
            :
            isUserType === 'executor' ?
              <ExecutorScreens />
              :
              null
          }
        </>
        : !loading && !isLoggedIn ?
          <AuthScreen />
          : null
      }
    </SafeAreaProvider>
  )
}