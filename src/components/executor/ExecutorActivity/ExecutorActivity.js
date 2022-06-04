//core
import React, { useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import {
    blackColorVar,
    localeVar,
    whiteColorVar
} from '@utils/cache'

//hooks
import { useExecutorFeed } from '@hooks_query/executor/useExecutorFeed'

//common components
import { OrderCardPreview } from '@common_components/Order/OrderCardPreview'
import { Loader } from '@common_components/Loaders/Loader'

//colors
import { blueColor } from '@utils/colors'

// const renderCardPreviewItem = (item) =>
//     <OrderCardPreview item={item} />

export const ExecutorActivity = ({ navigation }) => {

    //states

    //hooks

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            executorFeedRefetch()
            setRefreshing(false)
        }, 2000)
    }

    const handleSetCity = (value, name) => {
        const list = { ...city }
        list[name] = value
        setCity(list)
    }

    // if (executorFeedLoading) return <Loader />

    return (

        <View style={styles.container}>

            {/* <FlatList
                contentContainerStyle={{ paddingTop: 30 }}
                data={executorFeedData}
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
            /> */}

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