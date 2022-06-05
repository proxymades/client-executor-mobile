//core
import React from 'react'
import { useReactiveVar } from '@apollo/client'

//utils
import { localeVar } from '@utils/cache'
import { ClientActivityBlock } from './ClientActivityBlock'

export const ClientActivity = React.memo(({ item }) => {

    //lang hooks
    const locale = useReactiveVar(localeVar)

    return (

        <>

            {item.__typename === 'OrderRequest' ?
                <ClientActivityBlock
                    executor={item.executor}
                    order={item.order}
                    offer={item.offer}
                    createdAt={item.createdAt}
                />
                : null

            }

        </>

    )
})
