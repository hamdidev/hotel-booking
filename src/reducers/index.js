import { combineReducers } from "redux";
import { authReducer } from "./auth";
// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
