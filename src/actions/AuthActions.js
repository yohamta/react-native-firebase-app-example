import Expo from 'expo';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './types';

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginWithFacebook = () => async () => {
  try {
    const firebase = require('firebase'); // eslint-disable-line global-require
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '393602067714578',
      { permissions: ['public_profile'] }
    );
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);
    }
    console.log('User Logged In!');
  } catch (err) {
    console.log('err:', err);
  }
};

export const logout = () => async dispatch => {
  try {
    const firebase = require('firebase'); // eslint-disable-line global-require
    await firebase.auth().signOut();
    console.log('User Logged Out!');
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    console.log('err:', err);
  }
};
