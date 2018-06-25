import { PHOTO_SNAPPED } from '../actions/types';

const INITIAL_STATE = {
  photo: null,
};

export default (state = INITIAL_STATE, action) => {
  console.log({ state, action });
  switch (action.type) {
    case PHOTO_SNAPPED:
      return {
        ...state,
        photo: action.payload,
      };
    default:
      return state;
  }
};
