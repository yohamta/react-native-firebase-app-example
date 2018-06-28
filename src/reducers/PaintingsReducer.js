import {
  PAINTINGS_FETCH,
  PAINTINGS_FETCH_SUCCESS,
  PAINTINGS_FETCH_ADD,
  PAINTINGS_FETCH_NEXT,
  PAINTINGS_FETCH_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  paintings: [],
  error: null,
  lastVisible: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PAINTINGS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case PAINTINGS_FETCH_SUCCESS:
      return {
        ...state,
        paintings: action.payload,
        lastVisible: action.lastVisible,
        loading: false,
      };
    case PAINTINGS_FETCH_ADD:
      return {
        ...state,
        paintings: [...action.payload, ...state.paintings],
      };
    case PAINTINGS_FETCH_NEXT:
      return {
        ...state,
        paintings: [...state.paintings, ...action.payload],
        lastVisible: action.lastVisible,
        loading: false,
      };
    case PAINTINGS_FETCH_ERROR:
      return {
        ...state,
        error: action.type.message,
        loading: false,
      };
    default:
      return state;
  }
};
