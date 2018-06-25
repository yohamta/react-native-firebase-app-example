import { PHOTO_SNAPPED } from './types';

export const photoSnapped = ({ photo, navigation }) => {
  navigation.navigate('Post');
  return {
    type: PHOTO_SNAPPED,
    payload: photo,
  };
};

export const postAPhoto = ({ photo, message }) => async () => {
  const response = await fetch(photo.uri);
  const blob = await response.blob();
  const firebase = require('firebase'); // eslint-disable-line global-require
  const ext = photo.uri.replace(/^.*\./, '');
  const name = `${Date.now()}.${ext}`;
  console.log(photo);
  console.log(name);
  const ref = firebase
    .storage()
    .ref()
    .child(name);
  const snapshot = await ref.put(blob);
  const url = snapshot.ref.getDownloadURL();
  console.log(url);
};
