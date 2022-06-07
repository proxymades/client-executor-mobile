//core
import React, { useState } from 'react'
import { View, FlatList, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, localeVar, whiteColorVar } from '@utils/cache'

//hooks
import { useClientActivity } from '@hooks_query/client/activity/useClientActivity'

//components
import { ClientActivity } from './ClientActivity'

//common components
import { Loader } from '@common_components/Loaders/Loader'
import { EmptyPage } from '@common_components/EmptyPage/EmptyPage'

//colors
import { blueColor } from '@utils/colors'

const renderActivity = (item) =>
    <ClientActivity item={item} />

export const ClientActivityContainer = () => {

    //states
    const [refreshing, setRefreshing] = useState(false)

    //hooks
    const {
        clientActivityLoading,
        clientActivityData,
        clientActivityRefetch
    } = useClientActivity()

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
            clientActivityRefetch()
            setRefreshing(false)
        }, 2000)
    }

    if (clientActivityLoading) return <Loader />

    return (

        <View style={styles.container}>

            {clientActivityData.length === 0 ?
                <EmptyPage text={locale.emptyPage} />
                :
                <FlatList
                    contentContainerStyle={{ paddingTop: 30 }}
                    data={clientActivityData}
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