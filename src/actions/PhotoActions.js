import { ImageManipulator } from 'expo';
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

async function uploadPhotoBlob(photo, name) {
  const response = await fetch(photo.uri);
  const blob = await response.blob();
  return uploadFile(blob, name);
}

async function createThumbnail(photo, maxSize, compress) {
  let width;
  let height;
  if (photo.width > photo.height) {
    width = Math.min(photo.width, maxSize);
    height = (width / photo.width) * photo.height;
  } else {
    height = Math.min(photo.height, maxSize);
    width = (height / photo.height) * photo.width;
  }
  return ImageManipulator.manipulate(
    photo.uri,
    [{ resize: { width, height } }],
    {
      format: 'png',
      compress,
    }
  );
}

export const photoSnapped = ({ photo, navigation }) => {
  navigation.navigate('Post');
  return {
    type: PHOTO_SNAPPED,
    payload: photo,
  };
};

export const uploadPhoto = ({
  navigation,
  photo,
  title,
  category,
  message,
  user,
}) => async dispatch => {
  dispatch({ type: UPLOAD_PHOTO });
  try {
    // upload photo and thumbnail
    const name = `${Date.now()}`;
    const photoName = `images/${user.uid}/${name}.png`;
    const thumbName = `images/${user.uid}/thumb_${name}.png`;
    const images = await Promise.all([
      createThumbnail(photo, 1920, 0.7),
      createThumbnail(photo, 480, 0.5),
    ]);
    const result = await Promise.all([
      uploadPhotoBlob(images[0], photoName),
      uploadPhotoBlob(images[1], thumbName),
    ]);
    // write messaget to firestore
    const firebase = require('firebase'); // eslint-disable-line global-require
    require('firebase/firestore'); // eslint-disable-line global-require
    const db = firebase.firestore();
    await db.collection('paintings').add({
      uid: user.uid,
      title,
      category,
      message,
      /* photo */
      photo_name: photoName,
      photo_url: result[0],
      photo_width: images[0].width,
      photo_height: images[0].height,
      /* thumbnail */
      thumb_name: thumbName,
      thumb_url: result[1],
      thumb_width: images[1].width,
      thumb_height: images[1].height,
      /* timestamp */
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch({ type: UPLOAD_PHOTO_SUCCESS });
    navigation.navigate('Timeline');
  } catch (err) {
    console.log('err:', err);
    dispatch({ type: UPLOAD_PHOTO_FAIL, payload: err });
  }
};
