import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import uploadReducer from "./uploadReducer";
import errorReducer from "./errorReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  uploadReducer: uploadReducer,
  errors: errorReducer,
  form: formReducer
});
