import ax from "../config/ax";
import { FILE_UPLOADED, FILES_UPLOADED, GET_ERRORS } from "./types";

// File Upload Single
export const fileUploadSingle = (data, history) => dispatch => {
  return ax
    .post("/api/img-upload-single", data)
    .then(res =>
      dispatch({
        type: FILE_UPLOADED,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: res.data
      })
    );
};

// File Upload Multiple
export const fileUploadMultiple = (data, history) => dispatch => {
  return ax
    .post("/api/img-upload-multiple", data)
    .then(res =>
      dispatch({
        type: FILES_UPLOADED,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: res.data
      })
    );
};
