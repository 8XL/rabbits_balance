import React from 'react';
import { observer, inject } from 'mobx-react';

import { Info } from './index'

export const Panel = inject('mainStore', 'rabbitStore')(observer(({ mainStore, rabbitStore }) =>{
    return(
        <div className='panel'>
            <div className='panel__info'>
                <Info name={'progress'} content={mainStore.movementCounter}/>
                <Info name={'rabbits'} content={rabbitStore.rabbits.length}/>
                <Info name={'speed'} content={rabbitStore.rabbits.length}/>
                <Info name={'foxes'} content={rabbitStore.rabbits.length}/>
            </div>
        </div>
    )
}))