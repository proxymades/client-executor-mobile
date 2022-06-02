//core
import React, { useState } from 'react'
import { View, FlatList } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import {
    blackColorVar,
    whiteColorVar
} from '@utils/cache'

//hooks
import { useExecutorNewOrders } from '@hooks_query/executor/useExecutorNewOrders'

//common components
import { OrderCardPreview } from '@common_components/Order/OrderCardPreview'
import { Loader } from '@common_components/Loaders/Loader'

const renderCardPreviewItem = (item) =>
    <OrderCardPreview item={item} />

export const ExecutorNewOrders = () => {

    //states
    const [city, setCity] = useState(['nursultan'])
    const [category, setCategory] = useState(['polygraphy'])

    //hooks
    const {
        executorNewOrdersLoading,
        executorNewOrdersData
    } = useExecutorNewOrders(city, category)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    if (executorNewOrdersLoading) return <Loader />

    return (

        <View style={styles.container}>

            <FlatList
                contentContainerStyle={{ paddingTop: 30 }}
                data={executorNewOrdersData}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => renderCardPreviewItem(item)}
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