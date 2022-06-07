//core
import React, { useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//hooks
import { useExecutorActivity } from '@hooks_query/executor/activity/useExecutorActivity'

//components
import { ExecutorActivity } from './ExecutorActivity'

//common components
import { Loader } from '@common_components/Loaders/Loader'
import { EmptyPage } from '@common_components/EmptyPage/EmptyPage'

//colors
import { blueColor } from '@utils/colors'

const renderActivity = (item) =>
    <ExecutorActivity item={item} />

export const ExecutorActivityContainer = () => {

    //states
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        executorActivityLoading,
        executorActivityData,
        executorActivityRefetch
    } = useExecutorActivity()

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
        executorActivityRefetch()
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    if (executorActivityLoading) return <Loader />

    return (

        <View style={styles.container}>

            {executorActivityData.length === 0 ?
                <EmptyPage text={locale.emptyPage} refresh={handleRefresh} />
                :
                <FlatList
                    contentContainerStyle={{ paddingVertical: 30 }}
                    data={executorActivityData}
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
            }

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