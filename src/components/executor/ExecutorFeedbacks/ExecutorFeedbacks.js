//core
import React, { useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//hooks
import { useExecutorFeedbacks } from '@hooks_query/executor/profile/useExecutorFeedbacks'

//common components
import { Loader } from '@common_components/Loaders/Loader'
import { Feedback } from '@components/Common/Feedback/Feedback'

//colors
import { blueColor } from '@utils/colors'

const renderActivity = (item) =>
    item.message &&
    <Feedback
        avatar={item.client.avatar}
        name={item.client.name}
        verified={item.client.verified}
        message={item.message}
        rating={item.rating}
        createdAt={item.createdAt}
    />

export const ExecutorFeedbacks = () => {

    //states
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        executorFeedbacksLoading,
        executorFeedbacksData,
        executorFeedbacksRefetch
    } = useExecutorFeedbacks()

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
        executorFeedbacksRefetch()
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    if (executorFeedbacksLoading) return <Loader />

    return (

        <View style={styles.container}>

            <FlatList
                contentContainerStyle={{ paddingVertical: 30 }}
                data={executorFeedbacksData}
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