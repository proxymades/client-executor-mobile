//core
import React, { useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, whiteColorVar } from '@utils/cache'

//hooks
import { useExecutorReadyOrders } from '@hooks_query/executor/order/useExecutorReadyOrders'

//common components
import { OrderCardPreview } from '@common_components/Order/OrderCardPreview'
import { Loader } from '@common_components/Loaders/Loader'

//colors
import { blueColor } from '@utils/colors'

const renderCardPreviewItem = (item) =>
    <OrderCardPreview item={item.order} />

export const ExecutorReadyOrders = () => {

    //states
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        executorReadyOrdersLoading,
        executorReadyOrdersData,
        executorReadyOrdersRefetch
    } = useExecutorReadyOrders()

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            executorReadyOrdersRefetch()
            setRefreshing(false)
        }, 2000)
    }

    if (executorReadyOrdersLoading) return <Loader />

    return (

        <View style={styles.container}>

            <FlatList
                contentContainerStyle={{ paddingTop: 30 }}
                data={executorReadyOrdersData}
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