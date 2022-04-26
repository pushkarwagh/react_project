import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import getReducer from "./getReducer";

const rootReducer = combineReducers({
  login:loginReducer,
  get:getReducer
});

export default rootReducer;