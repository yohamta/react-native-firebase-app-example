import Expo, { Facebook } from "expo";
import { LOGIN_SUCCESS } from './types';

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginWithFacebook = () => async dispatch => {
  try {
    const firebase = require('firebase'); // eslint-disable-line global-require
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '393602067714578',
      { permissions: ['public_profile'] }
    );

    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential);
    }
  } catch (err) {
    console.log('err:', err);
  }
};
