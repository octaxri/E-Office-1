import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [isMessage, setMessage] = useState('');
    const [allowDismiss, setAllowDismiss] = useState(false);

    function toggle()
    {
        setIsShowing(!isShowing);
    }

    function response(el)
    {
        el === true ? setIsSuccess(true) : setIsSuccess(false)
    }

    function message(el)
    {
        setMessage(el)
    }

    function dismiss(el)
    {
        // el === true ? setAllowDismiss(true) : setAllowDismiss(false)
        setAllowDismiss(el)
    }

    return { isShowing, toggle, response, isSuccess, message, isMessage, dismiss, allowDismiss}

};

export default useModal;
