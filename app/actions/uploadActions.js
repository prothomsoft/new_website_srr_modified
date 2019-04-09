import ax from "../config/ax";
import { FILE_UPLOADED, GET_ERRORS } from "./types";

// File Upload
export const fileUpload = (data, history) => dispatch => {
  return ax
    .post("/api/img-upload", data)
    .then(res =>
      dispatch({
        type: FILE_UPLOADED,
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
