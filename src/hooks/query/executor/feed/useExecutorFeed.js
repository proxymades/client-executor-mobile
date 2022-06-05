//core
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_FEED } from '@gql_query/executor/feed/ExecutorFeed'

export const useExecutorFeed = (city, category) => {

    //states
    const [cityArray, setCityArray] = useState([])

    //queries
    const { data, loading, refetch } = useQuery(EXECUTOR_FEED, {
        fetchPolicy: 'network-only',
        variables: {
            city: cityArray,
            category: category,
        }
    })

    //effects
    useEffect(() => {
        city.nursultan ?
            setCityArray(actual => [...actual, 'nursultan']) :
            setCityArray(actual => actual.filter(el => el !== 'nursultan'))
        city.karaganda ?
            setCityArray(actual => [...actual, 'karaganda']) :
            setCityArray(actual => actual.filter(el => el !== 'karaganda'))
        city.almaty ?
            setCityArray(actual => [...actual, 'almaty']) :
            setCityArray(actual => actual.filter(el => el !== 'almaty'))
        city.atyrau ?
            setCityArray(actual => [...actual, 'atyrau']) :
            setCityArray(actual => actual.filter(el => el !== 'atyrau'))
    }, [city])

    return {
        executorFeedLoading: loading,
        executorFeedData: data?.executorFeed,
        executorFeedRefetch: refetch,
    }
}