import { PAINTINGS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  paintings: [],
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PAINTINGS_FETCH_SUCCESS:
      return {
        ...state,
        paintings: action.payload,
      };
    default:
      return state;
  }
};
