import { clearSession, decodeSession, setSession } from '../src/utils/session'
import { isTokenVar, isLoggedInVar, isUserPhoneVar, isUserIdVar, isUserTypeVar } from '../src/utils/cache'
import { MMKV } from 'react-native-mmkv'

jest.mock('react-native-mmkv', () => {
    const values = new Map()
    return { MMKV: class {
        set(key, value) { values.set(key, value) }
        delete(key) { values.delete(key) }
        getString(key) { return values.get(key) }
    } }
})

function token(payload) {
    const part = value => Buffer.from(JSON.stringify(value)).toString('base64')
    return `${part({ alg: 'HS256', typ: 'JWT' })}.${part(payload)}.signature`
}
const user = { id: 'test-client', phone: '1000000000', type: 'client', exp: Math.floor(Date.now() / 1000) + 3600 }

afterEach(clearSession)

test('invalid, expired and non-expiring stored tokens return to authentication', () => {
    for (const value of ['broken', token({ ...user, exp: 1 }), token({ ...user, exp: undefined }), token({ ...user, type: 'admin' })]) {
        expect(decodeSession(value)).toBeNull()
        expect(setSession(value)).toBeNull()
        expect(isLoggedInVar()).toBe(false)
        expect(isTokenVar()).toBe('')
    }
})

test('login sets authorization and identity before persisting the session', () => {
    const authToken = token(user)
    expect(setSession(authToken)).toEqual(user)
    expect(isTokenVar()).toBe(authToken)
    expect(isLoggedInVar()).toBe(true)
    expect(isUserPhoneVar()).toBe(user.phone)
    expect(isUserTypeVar()).toBe('client')
    expect(isUserIdVar()).toBe(user.id)
    expect(new MMKV().getString('token')).toBe(authToken)
})

test('logout clears stored credentials and reactive account state', () => {
    setSession(token(user))
    clearSession()
    expect(new MMKV().getString('token')).toBeUndefined()
    expect(isTokenVar()).toBe('')
    expect(isUserPhoneVar()).toBe('')
    expect(isUserIdVar()).toBe('')
    expect(isUserTypeVar()).toBe('')
    expect(isLoggedInVar()).toBe(false)
})
