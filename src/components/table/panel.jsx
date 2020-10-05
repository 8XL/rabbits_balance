import React from 'react';

import { Info } from './index'

export const Panel = () =>{
    return(
        <div className='panel'>
            <div className='panel__info'>
                <Info name={'score'} />
                <Info name={'rabbits'} />
                <Info name={'speed'} />
                <Info name={'foxes'} />
            </div>
        </div>
    )
}