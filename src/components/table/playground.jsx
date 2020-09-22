import React from 'react';
import { observer, inject } from 'mobx-react';

import { Chunk, Rabbit } from '../forest';

export const Playground = inject('forestStore', 'rabbitStore')(observer(({ forestStore, rabbitStore }) => {
    return(
        <div className='playground'>
            <div className='playground__border'>
                <div className='playground__field'>
                    {
                        forestStore.forest.map((chunk, i)=>(
                            <Chunk 
                                key={i} 
                                chunk={chunk} 
                                i={i}
                            > 
                                { rabbitStore.getRabbits.map((rabbit, index)=>{
                                    if(rabbit.position === i){
                                        rabbitStore.setTile(index, chunk.name)
                                        return  <Rabbit key={rabbit.id}/>
                                    }
                                })}
                            </Chunk>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}))