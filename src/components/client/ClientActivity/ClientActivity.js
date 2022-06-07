//core
import React from 'react'

//components
import { ClientActivityBlock } from './ClientActivityBlock'

export const ClientActivity = React.memo(({ item }) => {

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
