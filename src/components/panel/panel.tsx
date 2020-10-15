import React from 'react';

import { Info, Button } from '.'

export const Panel:React.FC = ():JSX.Element =>{
  return(
    <div className='panel'>
      <div className='panel__info'>
        <Info name={'score'} />
        <Info name={'rabbits'} />
        <Info name={'speed'} />
        <Info name={'foxes'} />
      </div>
      <div className='panel__speed'>
        <Button btn={'+'} />
        <Button btn={'-'} />
      </div>
    </div>
  )
}