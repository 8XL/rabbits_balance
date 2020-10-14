import React from 'react';
import { observer, inject } from 'mobx-react';

export const Button = inject('mainStore')(observer(({ mainStore, btn }) =>{
    const changeInterval = () =>{
        const val = btn.name==='+' ? mainStore.getIntervalSpeed+2 : mainStore.getIntervalSpeed-2;
        mainStore.changeInterval(val)
    }
    return(
        <button 
            className='btn'
            disabled={
                btn.name === '+' ?
                mainStore.getIntervalSpeed === 9
                :mainStore.getIntervalSpeed === 1
            }
            onClick={ changeInterval }
        >
            {btn.name}
        </button>
    )
}))