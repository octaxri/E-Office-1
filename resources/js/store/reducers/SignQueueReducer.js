let SignQueueReducer = (state = {}, actions) => {
    switch (actions.type) {
        case 'SET_SIGN_QUEUE':
            return {...state, queue: actions.payload};
        case 'CLEAR_SIGN_QUEUE':
            return {...state, queue: []};
        default:
            return state;
    }
};

export default SignQueueReducer;
