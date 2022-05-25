//core
import React from 'react'
import { View, FlatList } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import {
    blackColorVar,
    isUserPhoneVar,
    localeVar,
    whiteColorVar
} from '@utils/cache'

//hooks
import { useClientNewOrders } from '@hooks_query/client/useClientNewOrders'

//common components
import { OrderCardPreview } from '@common_components/Order/OrderCardPreview'
import { Loader } from '@common_components/Loaders/Loader'

//colors
import { lightgrayColor } from '@utils/colors'

const renderCardPreviewItem = (item) =>
    <OrderCardPreview item={item} />


export const ClientNewOrders = () => {

    //hooks
    const { clientNewOrdersLoading, clientNewOrdersData } = useClientNewOrders(isUserPhoneVar())

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    if (clientNewOrdersLoading) return <Loader />

    return (

        <View style={styles.container}>

            <FlatList
                contentContainerStyle={{ paddingTop: 30 }}
                data={clientNewOrdersData}
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