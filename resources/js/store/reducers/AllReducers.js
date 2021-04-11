import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import MenuReducer from "./MenuReducer";
import SignQueueReducer from "./SignQueueReducer";
import DispatchQueueReducer from "./DispatchQueueReducer";

let AllReducers = combineReducers({
        auth: AuthReducer,
        auth_menu: MenuReducer,
        dispatch_queue: DispatchQueueReducer,
        sign_queue: SignQueueReducer
    });

export default AllReducers;
