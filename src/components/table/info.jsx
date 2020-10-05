import React from 'react';
import { observer, inject } from 'mobx-react';

export const Info = inject('tableStore')(observer(({ tableStore, name })  =>{
    return(
        <div className='counter'>
            {
                name === 'rabbits'
                ? `RABBITS: ${tableStore.getTable[name]}`
                : name ==='foxes' 
                ? `FOXES: ${tableStore.getTable[name]}`
                : name === 'score'
                ? `SCORE: ${tableStore.getTable[name]}`
                : name === 'speed'
                ? `SPEED: ${tableStore.getTable[name]}`
                : ''
            }
        </div>
    )
}))