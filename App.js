//core
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useApolloClient, useReactiveVar } from '@apollo/client'
import { useColorScheme, Linking, Keyboard } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import jwt_decode from 'jwt-decode'

//screens
import { Screens } from '@screens/Screens'

//hooks

//components
import { Auth } from '@components/Auth/Auth'

//common components

//hooks_utils
import { useLanguage } from '@hooks_utils/useLanguage'

//utils
import {
  isLoggedInVar,
  isUsernameVar,
  isUserIdVar,
  isTokenVar,
  whiteColorVar,
  blackColorVar,
  darkblueColorVar,
  lightengrayColorVar,
  isKeyboardHeightVar,
  localeVar,
  isNotifedVar
} from '@utils/cache'

export const App = () => {

  //global hooks
  const client = useApolloClient()
  const colorScheme = useColorScheme()
  const [token, setToken] = useMMKVString('token')
  const [theme, setTheme] = useMMKVString('theme')
  const [language, setLanguage] = useMMKVString('language')
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const { lang } = useLanguage()

  //states
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      setLoading(false)
      isLoggedInVar(true)
      isUsernameVar(jwt_decode(token).username)
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

  return (
    <SafeAreaProvider>
      {!loading && isLoggedIn ?
        <Screens />
        : !loading && !isLoggedIn ?
          <Auth />
          : null
      }
    </SafeAreaProvider>
  )
}