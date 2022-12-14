import React from 'react';
import "../styles/Admin/StatisticsPage.scss"

export const MenuItem = ({name, handleClick}) => {
    return (<div className='menu-item' onClick={() => handleClick(name)}>
        <p>{name}</p>
    </div>)
}