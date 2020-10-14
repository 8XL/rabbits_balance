import React from 'react';
import { observer, inject } from 'mobx-react';

export const Info = inject('tableStore')(observer(({ tableStore, name })  =>{
    return(
        <div className='counter'>
            {
                name === 'rabbits'
                ? `RABBITS: ${tableStore.getPanel[name]}`
                : name ==='foxes' 
                ? `FOXES: ${tableStore.getPanel[name]}`
                : name === 'score'
                ? `SCORE: ${tableStore.getPanel[name]}`
                : name === 'speed'
                ? `SPEED: ${tableStore.getPanel[name]}`
                : ''
            }
        </div>
    )
}))