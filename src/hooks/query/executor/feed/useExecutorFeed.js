//core
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_FEED } from '@gql_query/executor/feed/ExecutorFeed'

export const useExecutorFeed = (city, category, selectedCity) => {

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
        setCityArray(Object.keys(city).filter(name => city[name]))
    }, [selectedCity])

    return {
        executorFeedLoading: loading,
        executorFeedData: data?.executorFeed,
        executorFeedRefetch: refetch,
    }
}