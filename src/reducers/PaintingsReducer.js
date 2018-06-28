import {
  PAINTINGS_FETCH_SUCCESS,
  PAINTINGS_FETCH_NEXT,
  PAINTINGS_FETCH_ERROR,
  PAINTINGS_SUBSCRIBE_ADDED,
} from '../actions/types';

const INITIAL_STATE = {
  paintings: [],
  error: null,
  lastVisible: null,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PAINTINGS_FETCH_SUCCESS:
      return {
        ...state,
        paintings: action.payload,
        lastVisible: action.lastVisible,
      };
    case PAINTINGS_FETCH_NEXT:
      return {
        ...state,
        paintings: [...state.paintings, action.payload],
        lastVisible: action.lastVisible,
      };
    case PAINTINGS_SUBSCRIBE_ADDED:
      return {
        ...state,
        paintings: [...action.payload, ...state.paintings],
        lastVisible: action.lastVisible,
      };
    case PAINTINGS_FETCH_ERROR:
      return {
        ...state,
        error: action.type.message,
      };
    default:
      return state;
  }
};
