import { takeLatest, call, put, all } from 'redux-saga/effects';

import ShopActionsTypes from './shop.types';

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from '../../redux/shop/shop.actions';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

export function* fetchCollectionsStartAsync() {
  try {
    const collectionRef = firestore.collection('collections');

    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  // Use TakeLatest to get only LAST request
  yield takeLatest(
    ShopActionsTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsStartAsync
  );
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ])
}