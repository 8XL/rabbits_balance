import React from 'react';
import { observer } from 'mobx-react-lite';
import { storesCtx } from '../../index';

interface IInfo {
	name: string
}

export const Info: React.FC<IInfo> = observer(({ name }):JSX.Element  =>{
  const { tableStore } = React.useContext(storesCtx)
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
})