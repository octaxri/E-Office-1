import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import MenuReducer from "./MenuReducer";

let AllReducers = combineReducers({auth: AuthReducer, auth_menu: MenuReducer});

export default AllReducers;
