import React from 'react';

import { classes } from '../../styles/useStyle';

export const Chunk = ({chunk, i}) => {
    return(
        <div className='playground__chunk' style={classes.playground.chunk[chunk.name]} onClick={()=>console.log(i)}/>
    )
};