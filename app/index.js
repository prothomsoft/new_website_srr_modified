import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes/routes.js";
import { renderRoutes } from "react-router-config";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";

const serializedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = createStore(
  rootReducer,
  serializedState,
  composeWithDevTools(applyMiddleware(thunk))
);

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/login";
  }
}

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
