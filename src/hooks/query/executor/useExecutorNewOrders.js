//core
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

//gql
import { EXECUTOR_NEW_ORDERS } from '@gql_query/executor/ExecutorNewOrders'

export const useExecutorNewOrders = (city, category) => {

    //states
    const [cityArray, setCityArray] = useState([])

    //queries
    const { data, loading, refetch } = useQuery(EXECUTOR_NEW_ORDERS, {
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
    }, [city])

    return {
        executorNewOrdersLoading: loading,
        executorNewOrdersData: data?.executorNewOrders,
        executorNewOrdersRefetch: refetch,
    }
}