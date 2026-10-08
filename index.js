//core
import React from 'react'
import { AppRegistry } from 'react-native'
import { App } from './App'
import { name as appName } from './app.json'
import { enableScreens } from 'react-native-screens'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { clearSession } from '@utils/session'
import messaging from '@react-native-firebase/messaging'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

//utils
import { isTokenVar } from '@utils/cache'
import { URI } from '@utils/uri'

enableScreens(true)

const uploadLink = new createUploadLink({
    uri: URI,
    headers: { 'Apollo-Require-Preflight': 'true' }
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: isTokenVar() !== '' ? `Bearer ${isTokenVar()}` : ''
        }
    }
})

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors?.some(error => error.extensions?.code === 'UNAUTHENTICATED')) {
        clearSession()
        client.clearStore().catch(() => {})
    }
})

// Firebase requires the background handler to be registered outside React.
messaging().setBackgroundMessageHandler(async () => {})

const client = new ApolloClient({
    link: errorLink.concat(authLink).concat(uploadLink),
    cache: new InMemoryCache()
})

const AppWithApollo = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => AppWithApollo)
