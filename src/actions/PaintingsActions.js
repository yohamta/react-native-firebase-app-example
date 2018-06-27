import { PAINTINGS_FETCH_SUCCESS } from './types';

export const fetchPaintings = () => async dispatch => {
  try {
    const firebase = require('firebase'); // eslint-disable-line global-require
    require('firebase/firestore'); // eslint-disable-line global-require
    const db = firebase.firestore();
    const querySnapshots = await db
      .collection('paintings')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();
    const paintings = [];
    querySnapshots.forEach(doc => {
      paintings.push(doc.data());
    });
    dispatch({
      type: PAINTINGS_FETCH_SUCCESS,
      payload: paintings,
    });
  } catch (err) {
    console.log('err:', err);
  }
};
