import { LOGIN_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  user: {
    displayName: 'Anonymous painter',
    photoURL: 'https://gyazo.com/4cfdbad9998d01b6155ffbf4b316c7ba',
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
    default:
      return state;
  }
};
