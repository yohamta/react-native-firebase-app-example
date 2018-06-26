import { TIMELINE_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case TIMELINE_FETCH_SUCCESS:
      return state;
    default:
      return state;
  }
};
