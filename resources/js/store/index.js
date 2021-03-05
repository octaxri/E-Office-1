import { createStore, applyMiddleware } from "redux";
import AllReducers from "./reducers/AllReducers";
import thunk from "redux-thunk"

let initialStates = {
    auth: {
        loggedIn : false,
        user: {},
    },
    auth_menu: {
        menu:[]
    }
};

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    AllReducers,
    initialStates,
    // applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
