import ax from "../config/ax";

import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  DELETE_USER,
  GET_ERRORS,
  USER_LOADING,
  CLEAR_ERRORS
} from "./types";

// Get Users
export const getUsers = () => dispatch => {
  dispatch(setUserLoading());
  return ax
    .get("/api/users")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

// Get User
export const getUser = id => dispatch => {
  dispatch(setUserLoading());
  return ax
    .get(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: null
      })
    );
};

// Add Post

export const addUser = (userData, history) => dispatch => {
  dispatch(clearErrors());
  return ax
    .post("/api/users", userData)
    .then(res =>
      dispatch({
        type: ADD_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete User
export const deleteUser = id => dispatch => {
  return ax
    .delete(`/api/users/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
