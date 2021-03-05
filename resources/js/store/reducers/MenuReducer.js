let MenuReducer = (state = {}, actions) => {
    switch (actions.type) {
        case 'AUTH_MENU':
            return {...state, menu: actions.payload};
        case 'NO_MENU':
            return {...state, menu: []};
        default:
            return state;
    }
};

export default MenuReducer;
