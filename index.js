//core
import React from 'react'
import { AppRegistry } from 'react-native'
import { App } from './App'
import { name as appName } from './app.json'
import { enableScreens } from 'react-native-screens'
import { ApolloClient, createHttpLink, ApolloProvider, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

//utils
import { isTokenVar } from '@utils/cache'
import { URI } from '@utils/uri'

enableScreens(true)

const httpLink = createHttpLink({
    uri: URI
})

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: isTokenVar() !== '' ? `Bearer ${isTokenVar()}` : ''
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

const AppWithApollo = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

AppRegistry.registerComponent(appName, () => AppWithApollo)
