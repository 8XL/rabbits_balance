import React from 'react';

export const Info = ({name, content}) =>{
    return(
        <div className='counter'>
            {
                name === 'rabbits'
                ? `RABBITS: ${content}`
                : name ==='foxes' 
                ? `FOXES: ${content}`
                : name === 'progress'
                ? `SCORE: ${content}`
                : name === 'speed'
                ? `SPEED: ${content}`
                : ''
            }
        </div>
    )
}