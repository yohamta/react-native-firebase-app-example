import { LOGIN_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  user: null,
  isAnonymous: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log({ user: action.payload });
      return {
        ...state,
        user: action.payload,
        isAnonymous: action.payload.isAnonymous,
      };
    default:
      return state;
  }
};
