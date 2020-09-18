import React from 'react';
import { observer, inject } from 'mobx-react';

import { classes } from '../../styles/useStyle';

export const Chunk = inject('rabbitStore')(observer(({ rabbitStore, chunk, i, rabbit }) => {
    return(
        <div className='playground__chunk' style={classes.playground.chunk[chunk.name]} onClick={rabbitStore.rabbitMovement}> 
            { 
                rabbitStore.getRabbits.map(el=>{
                    if(el === i){return  rabbit} 
                }) 
            }
            </div>
        )
}));