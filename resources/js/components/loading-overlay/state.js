import { useState } from 'react';

const useOverlay = () => {
    const [isActive, setIsActive] = useState(false)
    const [isOverlayMessage, setOverlayMessage] = useState('')

    function active(data)
    {
        setIsActive(data)
    }

    function overlayMessage(data)
    {
        setOverlayMessage(data)
    }

    return { isActive, active, isOverlayMessage, overlayMessage}

}

export default useOverlay
