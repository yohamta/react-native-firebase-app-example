import {
  PAINTINGS_FETCH_SUCCESS,
  PAINTINGS_FETCH_NEXT,
  PAINTINGS_FETCH_ERROR,
  PAINTINGS_SUBSCRIBE_ADDED,
} from './types';

const parseDoc = doc => ({
  id: doc.id,
  ...doc.data(),
});

const parseSnapshots = querySnapshot => {
  const paintings = [];
  querySnapshot.forEach(doc => {
    paintings.push(parseDoc(doc));
  });
  return paintings;
};

const FETCH_LIMIT = 5;

export const fetchNextPaintings = lastVisible => async dispatch => {
  try {
    const firebase = require('firebase'); // eslint-disable-line global-require
    require('firebase/firestore'); // eslint-disable-line global-require
    const db = firebase.firestore();
    const snapshots = await db
      .collection('paintings')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible)
      .limit(FETCH_LIMIT)
      .get();
    dispatch({
      type: PAINTINGS_FETCH_NEXT,
      payload: parseSnapshots(snapshots),
      lastVisible: snapshots.docs[snapshots.docs.length - 1],
    });
  } catch (err) {
    console.log('err:', err);
    dispatch({
      type: PAINTINGS_FETCH_ERROR,
      payload: err,
    });
  }
};

export const fetchPaintings = () => async dispatch => {
  try {
    // get timeline
    const firebase = require('firebase'); // eslint-disable-line global-require
    require('firebase/firestore'); // eslint-disable-line global-require
    const db = firebase.firestore();
    const query = db
      .collection('paintings')
      .orderBy('createdAt', 'desc')
      .limit(FETCH_LIMIT);
    const snapshots = await query.get();
    dispatch({
      type: PAINTINGS_FETCH_SUCCESS,
      payload: parseSnapshots(snapshots),
      lastVisible: snapshots.docs[snapshots.docs.length - 1],
    });
    // subscribe changes
    query.endBefore(snapshots.docs[0]).onSnapshot(snapshotsAdded => {
      const paintingsAdded = [];
      snapshotsAdded.docChanges().forEach(change => {
        console.log({ change });
        if (change.type === 'added') {
          paintingsAdded.push(parseDoc(change.doc));
        }
      });
      if (paintingsAdded.length > 0) {
        dispatch({
          type: PAINTINGS_SUBSCRIBE_ADDED,
          payload: parseSnapshots(snapshotsAdded),
          lastVisible: snapshots.docs[snapshots.docs.length - 1],
        });
      }
    });
  } catch (err) {
    console.log('err:', err);
    dispatch({
      type: PAINTINGS_FETCH_ERROR,
      payload: err,
    });
  }
};
