const queueExists = (state, dispatch) => {
    return state.dispatch.some(e => e.id === dispatch.id);
}

let DispatchQueueReducer = (state = [], actions) => {
    switch (actions.type) {
        // case 'SET_DISPATCH_TEST':

        //     return {...state, dispatch: actions.payload}
        case 'SET_DISPATCH_QUEUE':
            // console.log(state)
            if (queueExists(state, actions.payload)) {
                return state;
            } else {
                return {...state, dispatch:[...state.dispatch, actions.payload]};
            }
                // return {
                //     dispatch: state.dispatch.map(d => d.id === actions.payload.id)
                //     ? [...state.dispatch, actions.payload]
                //     : state
                // }
            // : {...state, dispatch: actions.payload}
            // return {...state, dispatch : actions.payload}
        case 'REMOVE_DISPATCH_QUEUE':
            return {...state, dispatch: state.dispatch.filter(e => e.id !== actions.payload.id)};
        case 'CLEAR_DISPATCH_QUEUE':
            return {...state, dispatch: []};
        default:
            return state;
    }
}

export default DispatchQueueReducer;
