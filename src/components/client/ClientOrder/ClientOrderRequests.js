//core
import React, { useState } from 'react'
import { View, ScrollView, Text, Switch, FlatList, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import {
    blackColorVar,
    isUserPhoneVar,
    lightengrayColorVar,
    localeVar,
    whiteColorVar
} from '@utils/cache'

//hooks
import { useExecutorOrderRequests } from '@hooks_query/executor/useExecutorOrderRequests'

//common components
import { OrderCardPreview } from '@common_components/Order/OrderCardPreview'
import { Loader } from '@common_components/Loaders/Loader'

//colors
import { blueColor, grayColor, lightblueColor, lightgrayColor, lightredColor } from '@utils/colors'
import { WhiteButton } from '@components/Common/Buttons/WhiteButton'
import { AcceptIcon, NotIcon } from '@components/Common/Svg/Svg'
import { ProfileLineData } from '@components/Common/Profile/ProfileLineData'
import { SwitchLine } from '@components/Common/Inputs/SwitchLine'

// const renderCardPreviewItem = (item) =>
//     <OrderCardPreview item={item.order} />

export const ClientOrderRequests = ({ navigation }) => {

    //states
    const [refreshing, setRefreshing] = useState(false)
    const [formState, setFormState] = useState({
        phone: '',
        accepted: false
    })

    //hooks
    // const {
    //     executorOrderRequestsLoading,
    //     executorOrderRequestsData,
    //     executorOrderRequestsRefetch
    // } = useExecutorOrderRequests(isUserPhoneVar())

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)
    const lightengrayColor = useReactiveVar(lightengrayColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //effects

    //handles
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            executorOrderRequestsRefetch()
            setRefreshing(false)
        }, 2000)
    }

    const handleInputFormChange = (value, name, phone) => {
        const list = { ...formState }
        list[name] = value
        list['phone'] = phone
        setFormState(list)
    }

    // if (executorOrderRequestsLoading) return <Loader />

    return (

        <ScrollView
            keyboardShouldPersistTaps='handler'
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 80 }}
            nestedScrollEnabled={true}
        >

            <Text style={styles.important}>{locale.deleteOrderImportant}</Text>

            <View style={styles.orderButtons}>

                <WhiteButton>

                    <View style={styles.buttonItems}>

                        <AcceptIcon width={25} height={25} fill={lightblueColor} />

                        <Text style={styles.buttonText}>Заказ выполнен</Text>

                    </View>

                </WhiteButton>

                <WhiteButton>

                    <View style={styles.buttonItems}>

                        <NotIcon width={15} height={15} fill={lightredColor} />

                        <Text style={styles.buttonText}>Заказ не выполнен</Text>

                    </View>

                </WhiteButton>

            </View>

            <Text style={styles.text}>{locale.requests}</Text>

            <View style={styles.request}>

                <ProfileLineData
                    // avatar={executor.avatar}
                    // name={executor.name}
                    // verified={executor.verified}
                    name='RINA'
                    size={35}
                />

                <Switch
                    trackColor={{ false: lightgrayColor, true: lightblueColor }}
                    thumbColor={formState.accepted ? blueColor : lightengrayColor}
                    ios_backgroundColor={grayColor}
                    onValueChange={e => handleInputFormChange(e, 'accepted', 'rina')}
                    value={formState.accepted}
                />

            </View>

            {/* <FlatList
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
            />*/}

        </ScrollView>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
        paddingHorizontal: 16,
        paddingTop: 30,
    },
    important: {
        fontSize: 13,
        color: lightgrayColor,
        fontStyle: 'italic'
    },
    orderButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    buttonItems: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7
    },
    buttonText: {
        fontSize: 12,
        color: blackColor,
        marginLeft: 5
    },
    text: {
        fontSize: 14,
        color: grayColor,
        marginVertical: 10,
    },
    request: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})