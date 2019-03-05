import ax from "../config/ax";

import { GET_USERS, DELETE_USER } from "./types";

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
