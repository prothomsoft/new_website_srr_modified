import { FILE_UPLOADED, FILES_UPLOADED } from "../actions/types";

const initialState = {
  image: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FILE_UPLOADED:
      return {
        ...state,
        image: action.payload
      };
    case FILES_UPLOADED:
      return {
        ...state,
        image: action.payload
      };
    default:
      return state;
  }
}
