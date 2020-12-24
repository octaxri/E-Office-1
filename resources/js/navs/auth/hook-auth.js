import { useState } from 'react';

const setActiveSidebar = () => {
    const [menuIsActive, setMenuIsActive] = useState([]);

    function setActive(el)
    {
        setMenuIsActive(el);
    }

    return {setActive, menuIsActive}

};

export default setActiveSidebar;
