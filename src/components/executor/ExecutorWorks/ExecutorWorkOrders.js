//core
import React, { useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, whiteColorVar } from '@utils/cache'

//hooks
import { useExecutorWorkOrders } from '@hooks_query/executor/order/useExecutorWorkOrders'

//common components
import { OrderCardPreview } from '@common_components/Order/OrderCardPreview'
import { Loader } from '@common_components/Loaders/Loader'

//colors
import { blueColor } from '@utils/colors'

const renderCardPreviewItem = (item) =>
    <OrderCardPreview item={item.order} />

export const ExecutorWorkOrders = () => {

    //states
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        executorWorkOrdersLoading,
        executorWorkOrdersData,
        executorWorkOrdersRefetch
    } = useExecutorWorkOrders()

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            executorWorkOrdersRefetch()
            setRefreshing(false)
        }, 2000)
    }

    if (executorWorkOrdersLoading) return <Loader />

    return (

        <View style={styles.container}>

            <FlatList
                contentContainerStyle={{ paddingTop: 30 }}
                data={executorWorkOrdersData}
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