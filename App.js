//core
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useReactiveVar } from '@apollo/client'
import { useColorScheme, Keyboard } from 'react-native'
import { useMMKVString } from 'react-native-mmkv'
import { clearSession, setSession } from '@utils/session'
import { useRegisterClientNotificationToken } from '@hooks_mutation/auth/useRegisterClientNotificationToken'
import { useRegisterExecutorNotificationToken } from '@hooks_mutation/auth/useRegisterExecutorNotificationToken'
import messaging from '@react-native-firebase/messaging'

//screens
import { ClientScreens } from '@screens/client/ClientScreens'
import { ExecutorScreens } from '@screens/executor/ExecutorScreens'
import { AuthScreen } from '@screens/AuthScreen'

//hooks_utils
import { useLanguage } from '@hooks_utils/useLanguage'

//utils
import {
  isLoggedInVar,
  isUserTypeVar,
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
  const [token] = useMMKVString('token')
  const [theme] = useMMKVString('theme')
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const isUserType = useReactiveVar(isUserTypeVar)
  const { lang } = useLanguage()
  const { registerClientNotificationToken } = useRegisterClientNotificationToken()
  const { registerExecutorNotificationToken } = useRegisterExecutorNotificationToken()

  //states
  const [loading, setLoading] = useState(true)

  //effects
  useEffect(() => {
    if (!token) return
    return messaging().onTokenRefresh(pushToken => {
      const user = setSession(token)
      if (!user) return
      const register = user.type === 'client' ? registerClientNotificationToken : registerExecutorNotificationToken
      register(user.phone, token, pushToken).catch(() => {
        isNotifedVar('Не удалось обновить push-уведомления')
      })
    })
  }, [token, registerClientNotificationToken, registerExecutorNotificationToken])

  useEffect(() => {
    return messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification?.body) isNotifedVar(remoteMessage.notification.body)
    })
  }, [])

  useEffect(() => {
    if (token) {
      const user = setSession(token)
      if (user) {
        const remaining = user.exp * 1000 - Date.now()
        const timer = setTimeout(clearSession, remaining)
        setLoading(false)
        return () => clearTimeout(timer)
      }
    } else clearSession()
    setLoading(false)
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
  }, [lang])

  useEffect(() => {
    const keyboardOpened = Keyboard.addListener('keyboardDidShow', (e) => {
      isKeyboardHeightVar(e.endCoordinates.height);
    })
    return () => keyboardOpened.remove()
  }, [])

  useEffect(() => {
    const keyboardClosed = Keyboard.addListener('keyboardDidHide', (e) => {
      isKeyboardHeightVar(e.endCoordinates.height);
    })
    return () => keyboardClosed.remove()
  }, [])

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