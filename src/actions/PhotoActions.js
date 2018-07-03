import { ImageManipulator } from 'expo';
import {
  PHOTO_SNAPPED,
  UPLOAD_PHOTO,
  UPLOAD_PHOTO_FAIL,
  UPLOAD_PHOTO_SUCCESS,
} from './types';

// Upload a file to cloud store
// blob: byte array of the file
// name: name of the file to save to cloud storage
async function uploadFile(blob, name) {
  const firebase = require('firebase'); // eslint-disable-line global-require
  const ref = firebase
    .storage()
    .ref()
    .child(name);
  const snapshot = await ref.put(blob);
  return snapshot.ref.getDownloadURL();
}

// Upload a image to cloud store
// photo: the photo to upload
// name: name of the file to save to cloud storage
async function uploadPhotoBlob(photo, name) {
  const response = await fetch(photo.uri);
  const blob = await response.blob();
  return uploadFile(blob, name);
}

// Resize a image file
// photo: the image file to resize
// compress: compression leve of the resized image(0.0 - 1.0)
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

// Save document to firestore
// collection: collection name of firestore
// document: document to save
const saveDocumentToFirestore = async (collection, document) => {
  const firebase = require('firebase'); // eslint-disable-line global-require
  require('firebase/firestore'); // eslint-disable-line global-require
  const db = firebase.firestore();
  await db.collection(collection).add(document);
};

const getTimestamp = () => {
  const firebase = require('firebase'); // eslint-disable-line global-require
  require('firebase/firestore'); // eslint-disable-line global-require
  return firebase.firestore.FieldValue.serverTimestamp();
};

export const uploadPhoto = ({
  navigation,
  photo,
  title,
  category,
  message,
  uid,
  authorName,
}) => async dispatch => {
  dispatch({ type: UPLOAD_PHOTO });
  try {
    // upload photo and thumbnail
    const name = `${Date.now()}`;
    const photoName = `images/${uid}/${name}.png`;
    const thumbName = `images/${uid}/thumb_${name}.png`;
    const images = await Promise.all([
      createThumbnail(photo, 1920, 0.7),
      createThumbnail(photo, 480, 0.5),
    ]);
    const result = await Promise.all([
      uploadPhotoBlob(images[0], photoName),
      uploadPhotoBlob(images[1], thumbName),
    ]);
    // write messaget to firestore
    const timestamp = getTimestamp();
    await saveDocumentToFirestore('paintings', {
      uid,
      authorName,
      title,
      category,
      message,
      /* photo */
      photoName,
      photoUrl: result[0],
      photoWidth: images[0].width,
      photoHeight: images[0].height,
      /* thumbnail */
      thumbName,
      thumbUrl: result[1],
      thumbWidth: images[1].width,
      thumbHeight: images[1].height,
      /* timestamp */
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    dispatch({ type: UPLOAD_PHOTO_SUCCESS });
    navigation.navigate('Timeline');
  } catch (err) {
    console.log('err:', err);
    dispatch({ type: UPLOAD_PHOTO_FAIL, payload: err });
  }
};
