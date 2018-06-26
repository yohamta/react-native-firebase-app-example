import {
  PHOTO_SNAPPED,
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  photo: null,
  uploading: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log({ state, action });
  switch (action.type) {
    case PHOTO_SNAPPED:
      return {
        ...state,
        photo: action.payload,
      };
    case UPLOAD_PHOTO:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        uploading: false,
      };
    case UPLOAD_PHOTO_FAIL:
      return {
        ...state,
        uploading: false,
      };
    default:
      return state;
  }
};
