import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import Draggable from 'react-draggable';

const PdfSign = ({dPos, qrRef}) => {

    let [activeDrags, setActiveDrags] = useState(0);
    let [deltaPosition, setDeltaPosition] = useState({x: 0, y: 0})
    // const [controlledPosition, setControlledPosition] = useState({x: -400, y: 200})

    const handleDrag = (e, ui) => {
        const {x, y} = deltaPosition;
        setDeltaPosition({x: x + ui.deltaX, y: y + ui.deltaY})
        dPos({x: x + ui.deltaX, y: y + ui.deltaY})
    };

    function onStart() {
        setActiveDrags(activeDrags++);
    };

    function onStop() {
        setActiveDrags(activeDrags--);
    };

    const dragHandlers = {onStart, onStop};
    // const {deltaPosition, controlledPosition} = this.state;


    return (
        <Draggable bounds="parent" defaultPosition={{x: 0, y: 0}} onDrag={handleDrag} {...dragHandlers}>
            <div className="box" style={box} ref={qrRef}>
                {/* <div className="text-white">x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div> */}
            </div>
        </Draggable>
    )
}

const box = {
    position:'absolute',
    width: '14%',
    height: '12%',
    float: 'left',
    zIndex: '2'
}


export default PdfSign


