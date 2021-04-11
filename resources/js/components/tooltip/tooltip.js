import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import ReactTooltip from 'react-tooltip';

const ItemWTooltip = ({component, id, text, type, place}) => {

    return (
        <>
            {component}
            {/* <a data-tip data-for='sadFace'> இдஇ </a> */}
            <ReactTooltip id={id} backgroundColor={color ? color : 'black'} effect='solid' border="true" place={place ? place : 'top'} type={type ? type : 'dark'}>
                <span>{text}</span>
            </ReactTooltip>
        </>
    )
}

export default ItemWTooltip
