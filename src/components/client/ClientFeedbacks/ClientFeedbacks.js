//core
import React, { useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//hooks
import { useClientFeedbacks } from '@hooks_query/client/profile/useClientFeedbacks'

//common components
import { Loader } from '@common_components/Loaders/Loader'
import { Feedback } from '@components/Common/Feedback/Feedback'

//colors
import { blueColor } from '@utils/colors'

const renderActivity = (item) =>
    item.message &&
    <Feedback
        avatar={item.executor.avatar}
        name={item.executor.name}
        verified={item.executor.verified}
        message={item.message}
        rating={item.rating}
        createdAt={item.createdAt}
    />

export const ClientFeedbacks = () => {

    //states
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        clientFeedbacksLoading,
        clientFeedbacksData,
        clientFeedbacksRefetch
    } = useClientFeedbacks()

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
        clientFeedbacksRefetch()
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    if (clientFeedbacksLoading) return <Loader />

    return (

        <View style={styles.container}>

            <FlatList
                contentContainerStyle={{ paddingVertical: 30 }}
                data={clientFeedbacksData}
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