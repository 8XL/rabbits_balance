import React from 'react';

import { classes } from '../../styles/useStyle';

export const Chunk = ({chunk, children }) => {
    return(
        <div className='playground__chunk' style={classes.playground.chunk[chunk.name]}> 
            { children }
        </div>
        )
};