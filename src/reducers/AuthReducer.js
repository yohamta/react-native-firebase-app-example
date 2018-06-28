import { LOGIN_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  user: null,
  isAnonymous: false,
  name: 'Anonymous Painter',
  bio: 'Just another enthusiastic painter.',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAnonymous: action.payload.isAnonymous,
      };
    default:
      return state;
  }
};
