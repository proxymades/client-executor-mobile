//core
import React, { useState, useEffect } from 'react'
import { View, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import {
    blackColorVar,
    localeVar,
    whiteColorVar
} from '@utils/cache'

//hooks
import { useExecutorFeed } from '@hooks_query/executor/feed/useExecutorFeed'

//common components
import { OrderCardPreview } from '@common_components/Order/OrderCardPreview'
import { Loader } from '@common_components/Loaders/Loader'
import { ExtraModal } from '@common_components/Modals/ExtraModal'
import { CityFilterForm } from '@common_components/Modals/Forms/CityFilterForm'
import { EmptyPage } from '@common_components/EmptyPage/EmptyPage'

//icons
import { LocationFilterIcon } from '@common_components/Svg/Svg'

//colors
import { blueColor } from '@utils/colors'

const renderCardPreviewItem = (item) =>
    <OrderCardPreview item={item} />

export const ExecutorFeed = ({ navigation }) => {

    //states
    const [city, setCity] = useState({
        nursultan: true,
        karaganda: true,
        almaty: true,
        atyrau: true,
    })
    const [category, setCategory] = useState(['polygraphy', 'souvenir', 'outad'])
    const [refreshing, setRefreshing] = useState(false)
    const [cityModalShow, setCityModalShow] = useState(false)
    const [selectedCity, setSelectedCity] = useState(true)

    //hooks
    const {
        executorFeedLoading,
        executorFeedData,
        executorFeedRefetch
    } = useExecutorFeed(city, category, selectedCity)

    //lang hooks
    const locale = useReactiveVar(localeVar)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //effects
    useEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <TouchableOpacity
                    style={styles.filter}
                    onPress={handleOpenCityModal}
                >
                    <LocationFilterIcon width='22' height='22' fill={blueColor} />
                </TouchableOpacity>
            ,
            headerTitleAlign: 'left',
        })
    }, [navigation])

    //handles
    const handleRefresh = () => {
        setRefreshing(true)
        executorFeedRefetch()
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }

    const handleOpenCityModal = () => {
        setCityModalShow(true)
    }

    const handleSetCity = (value, name) => {
        const list = { ...city }
        list[name] = value
        setCity(list)
    }

    if (executorFeedLoading) return <Loader />

    return (

        <View style={styles.container}>

            {executorFeedData.length === 0 ?
                <EmptyPage text={locale.emptyPage} refresh={handleRefresh} />
                :
                <FlatList
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
                />
            }

            <ExtraModal
                modalVisible={cityModalShow}
                setModalVisible={setCityModalShow}
            >
                <CityFilterForm
                    setModalVisible={setCityModalShow}
                    label={locale.selectCities}
                    input={city}
                    inputChange={handleSetCity}
                    setSelectedCity={setSelectedCity}
                />
            </ExtraModal>

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