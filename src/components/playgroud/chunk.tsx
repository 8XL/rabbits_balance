import React from 'react';

import { classes } from '../../styles/useStyle';

interface IChunk {
	chunk: TDataTile
}

export const Chunk:React.FC<IChunk> = ({chunk, children }) => {
    return(
        <div className='playground__chunk' style={classes.playground.chunk[chunk]}> 
            { children }
        </div>
        )
};