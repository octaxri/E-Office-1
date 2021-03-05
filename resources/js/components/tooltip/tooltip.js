import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import ReactTooltip from 'react-tooltip';

const ItemWTooltip = ({component, id, text}) => {

    return (
        <>
            {component}
            {/* <a data-tip data-for='sadFace'> இдஇ </a> */}
            <ReactTooltip id={id} backgroundColor='black' effect='solid'>
                <span>{text}</span>
            </ReactTooltip>
        </>
    )
}

export default ItemWTooltip
