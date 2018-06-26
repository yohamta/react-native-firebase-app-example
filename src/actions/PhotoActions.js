import {
  PHOTO_SNAPPED,
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_FAIL,
  UPLOAD_PHOTO_SUCCESS,
} from './types';

async function uploadFile(blob, name) {
  const firebase = require('firebase'); // eslint-disable-line global-require
  const ref = firebase
    .storage()
    .ref()
    .child(name);
  const snapshot = await ref.put(blob);
  return snapshot.ref.getDownloadURL();
}

export const photoSnapped = ({ photo, navigation }) => {
  navigation.navigate('Post');
  return {
    type: PHOTO_SNAPPED,
    payload: photo,
  };
};

export const uploadPhoto = ({ photo, message, user }) => async dispatch => {
  dispatch({ type: UPLOAD_PHOTO });
  try {
    // upload photo
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    const ext = photo.uri.replace(/^.*\./, '');
    const basename = Date.now();
    const url = await uploadFile(blob, `${basename}.${ext}`);
    console.log(url);
    // write messaget to firestore
    const firebase = require('firebase'); // eslint-disable-line global-require
    require('firebase/firestore'); // eslint-disable-line global-require
    const db = firebase.firestore();
    const docRef = await db.collection('paintings').add({
      uid: user.uid,
      message,
      photo_url: url,
    });
    console.log(`Document written: ${docRef.id}`);
    dispatch({ type: UPLOAD_PHOTO_SUCCESS });
  } catch (err) {
    console.log('err:', err);
    dispatch({ type: UPLOAD_PHOTO_FAIL, payload: err });
  }
};
