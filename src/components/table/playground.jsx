import React from 'react';
import { observer, inject } from 'mobx-react';

import { Chunk } from '../forest'
import { classes } from '../../styles/useStyle';

export const Playground = inject('forestStore')(observer(({forestStore}) => {
    return(
        <div className='playground'>
            <div className='playground__border'>
                <div className='playground__field'>
                    {
                        forestStore.forest.map((chunk, i)=>(
                            <Chunk key={i} chunk={chunk} i={i} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}))