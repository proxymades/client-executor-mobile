//core
import React, { useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, whiteColorVar } from '@utils/cache'

//hooks
import { useClientOrdersRequests } from '@hooks_query/client/order/useClientOrdersRequests'

//components
import { ClientActivity } from './ClientActivity'

//common components
import { Loader } from '@common_components/Loaders/Loader'

//colors
import { blueColor } from '@utils/colors'

const renderActivity = (item) =>
    <ClientActivity item={item} />

export const ClientActivityContainer = () => {

    //states
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        clientOrdersRequestsLoading,
        clientOrdersRequestsData,
        clientOrdersRequestsRefetch
    } = useClientOrdersRequests()

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            clientOrdersRequestsRefetch()
            setRefreshing(false)
        }, 2000)
    }

    if (clientOrdersRequestsLoading) return <Loader />

    return (

        <View style={styles.container}>

            <FlatList
                contentContainerStyle={{ paddingTop: 30 }}
                data={clientOrdersRequestsData}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderActivity(item)}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[blueColor]}
                        progressBackgroundColor={whiteColor}
                    />
                }
            />

        </View>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
    },
    filter: {
        marginLeft: 20
    },
})