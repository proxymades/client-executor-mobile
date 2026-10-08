import jwtDecode from 'jwt-decode'
import { MMKV } from 'react-native-mmkv'
import { isTokenVar, isLoggedInVar, isUserPhoneVar, isUserIdVar, isUserTypeVar } from './cache'

const storage = new MMKV()

export function decodeSession(token) {
    try {
        const user = jwtDecode(token)
        if (!['client', 'executor'].includes(user.type) || !/^\d{10,20}$/.test(user.phone) || typeof user.phone !== 'string' ||
            typeof user.id !== 'string' || !/^[a-zA-Z0-9_-]{1,128}$/.test(user.id) ||
            !Number.isFinite(user.exp) || user.exp * 1000 <= Date.now()) return null
        return user
    } catch {
        return null
    }
}

export function clearSession() {
    isTokenVar('')
    isUserPhoneVar('')
    isUserIdVar('')
    isUserTypeVar('')
    isLoggedInVar(false)
    storage.delete('token')
}

export function setSession(token) {
    const user = decodeSession(token)
    if (!user) {
        clearSession()
        return null
    }
    // Set the request header before saving MMKV or registering push tokens.
    isTokenVar(token)
    isUserPhoneVar(user.phone)
    isUserIdVar(user.id)
    isUserTypeVar(user.type)
    isLoggedInVar(true)
    storage.set('token', token)
    return user
}
