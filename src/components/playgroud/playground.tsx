import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Chunk, Rabbit } from '.';
import { storesCtx } from '../../index';

export const Playground:React.FC = observer((): JSX.Element => {
	const { forestStore, rabbitStore } = React.useContext(storesCtx)
  return(
    <div className='playground'>
      <div className='playground__border'>
        <div className='playground__field'>
          {
            forestStore.getForest.map((chunk, i)=>(
              <Chunk 
                key={i} 
                chunk={chunk}
              >
                { rabbitStore.getRabbits.map((rabbit, index)=>{
                  if(rabbit.position === i){
                    rabbitStore.setTile(index, chunk)
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
})