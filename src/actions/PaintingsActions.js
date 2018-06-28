import {
  PAINTINGS_FETCH,
  PAINTINGS_FETCH_SUCCESS,
  PAINTINGS_FETCH_ADD,
  PAINTINGS_FETCH_NEXT,
  PAINTINGS_FETCH_ERROR,
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

const FETCH_LIMIT = 3;

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
    dispatch({
      type: PAINTINGS_FETCH,
    });
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

    // subscribe local changes
    query.endBefore(snapshots.docs[0]).onSnapshot(snapshotsAdded => {
      const paintingsAdded = [];
      snapshotsAdded.docChanges().forEach(change => {
        if (change.type === 'added' && change.doc.metadata.hasPendingWrites) {
          paintingsAdded.push(parseDoc(change.doc));
        }
      });
      if (paintingsAdded.length > 0) {
        dispatch({
          type: PAINTINGS_FETCH_ADD,
          payload: parseSnapshots(snapshotsAdded),
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
