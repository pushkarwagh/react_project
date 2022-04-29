import { combineReducers } from "redux";

import loginReducer from "./loginReducer";
import getAllReducer from "./getAllReducer";
import getUserReducer from "./getUserReducer";

const rootReducer = combineReducers({
  login:loginReducer,
  getAllUsers:getAllReducer,
  getUser:getUserReducer
});

export default rootReducer;