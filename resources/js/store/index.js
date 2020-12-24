import { createStore } from "redux";
import AllReducers from "./reducers/AllReducers";

let initialStates = {
    auth: {
        loggedIn : false,
        user: {}
    }
};

let store = createStore(
    AllReducers,
    initialStates,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
