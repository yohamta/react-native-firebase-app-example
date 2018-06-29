import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  user: {
    uid: 'anonymous',
    displayName: 'Anonymous painter',
    photoURL: 'https://i.gyazo.com/4aa89a28049a0d6635b747183a3a6ebe.jpg',
  },
  isLoggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
