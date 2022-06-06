//core
import React from 'react'

//components
import { ExecutorActivityBlock } from './ExecutorActivityBlock'

export const ExecutorActivity = React.memo(({ item }) => {

    return (

        <>

            {item.accepted &&
                !item.finished ?
                <ExecutorActivityBlock
                    client={item.order.client}
                    order={item.order}
                    offer={item.offer}
                    createdAt={item.createdAt}
                    isFinished={item.finished}
                />
                : null
            }

            {item.accepted &&
                item.finished ?
                <ExecutorActivityBlock
                    client={item.order.client}
                    order={item.order}
                    offer={item.offer}
                    createdAt={item.createdAt}
                    isFinished={item.finished}
                />
                : null
            }

        </>

    )
})
