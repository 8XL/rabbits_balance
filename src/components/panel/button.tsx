import React from 'react';
import { observer } from 'mobx-react-lite';
import { storesCtx } from '../../index'

interface IButton {
	btn: string
}

export const Button:React.FC<IButton> = observer(({ btn }):JSX.Element =>{
  const { mainStore } = React.useContext(storesCtx)
  const changeInterval = () =>{
    const val = btn ==='+' ? mainStore.getIntervalSpeed+2 : mainStore.getIntervalSpeed-2;
    mainStore.changeInterval(val)
  }
  return(
    <button 
      className='btn'
      disabled={
        btn === '+' ?
        mainStore.getIntervalSpeed === 9
        :mainStore.getIntervalSpeed === 1
      }
      onClick={ changeInterval }
    >
      {btn}
    </button>
    )
})