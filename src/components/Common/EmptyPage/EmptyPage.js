//core
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, RefreshControl } from 'react-native'
import { useReactiveVar } from '@apollo/client'

//utils
import { blackColorVar, whiteColorVar } from '@utils/cache'

//colors
import { blueColor, grayColor } from '@utils/colors'

export const EmptyPage = ({ text, refresh }) => {

    //states
    const [refreshing, setRefreshing] = useState(false)

    //color hooks
    const whiteColor = useReactiveVar(whiteColorVar)
    const blackColor = useReactiveVar(blackColorVar)

    //styles
    const styles = getStyles(whiteColor, blackColor)

    //handles
    const handleRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            refresh()
            setRefreshing(false)
        }, 2000)
    }

    return (

        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[blueColor]}
                    progressBackgroundColor={whiteColor}
                />
            }
        >

            <Text style={styles.text}>{text}</Text>

        </ScrollView>

    )
}

const getStyles = (whiteColor, blackColor) => ({
    container: {
        flex: 1,
        backgroundColor: whiteColor,
    },
    text: {
        fontSize: 14,
        color: grayColor,
        alignSelf: 'center',
        marginTop: '40%',
    },
})