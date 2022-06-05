//core
import React, { useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import {
    blackColorVar,
    isUserPhoneVar,
    whiteColorVar
} from '@utils/cache'

//hooks
import { useExecutorOrderRequests } from '@hooks_query/executor/order/useExecutorOrderRequests'

//common components
import { OrderCardPreview } from '@common_components/Order/OrderCardPreview'
import { Loader } from '@common_components/Loaders/Loader'

//colors
import { blueColor } from '@utils/colors'

const renderCardPreviewItem = (item) =>
    <OrderCardPreview item={item.order} />

export const ExecutorOrderRequests = () => {

    //states
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        executorOrderRequestsLoading,
        executorOrderRequestsData,
        executorOrderRequestsRefetch
    } = useExecutorOrderRequests(isUserPhoneVar())

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            executorOrderRequestsRefetch()
            setRefreshing(false)
        }, 2000)
    }

    if (executorOrderRequestsLoading) return <Loader />

    return (

        <View style={styles.container}>

            <FlatList
                contentContainerStyle={{ paddingTop: 30 }}
                data={executorOrderRequestsData}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderCardPreviewItem(item)}
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
})