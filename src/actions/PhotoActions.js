import { PHOTO_SNAPPED, UPLOAD_PHOTO } from './types';

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

export const uploadPhoto = ({ photo, message }) => async dispatch => {
  dispatch({ type: UPLOAD_PHOTO });
  const response = await fetch(photo.uri);
  const blob = await response.blob();
  const ext = photo.uri.replace(/^.*\./, '');
  const basename = Date.now();
  const url = await uploadFile(blob, `${basename}.${ext}`);
  console.log(url);
};
