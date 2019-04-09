import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import uploadReducer from "./uploadReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  uploadReducer: uploadReducer,
  errors: errorReducer
});
