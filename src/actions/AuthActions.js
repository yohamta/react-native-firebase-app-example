import { LOGIN_SUCCESS } from './types';

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
