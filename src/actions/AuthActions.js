import { LOGIN_SUCCESS } from './types';

export const loginAnonymously = () => () => {
  const firebase = require('firebase'); // eslint-disable-line global-require
  firebase
    .auth()
    .signInAnonymously()
    .catch(err => {
      console.log('err:', err);
    });
};

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
