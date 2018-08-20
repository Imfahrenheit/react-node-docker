import { takeLatest } from "redux-saga/effects";
import * as actionType from "../actions/actionTypes";
import * as allSagas from "./MainSaga";
export function* watcherSaga() {
  yield takeLatest(actionType.INIT_STORE_USER, allSagas.storeUserSaga);
  yield takeLatest(actionType.INIT_USER_SIGN_UP, allSagas.userSignUpSaga);
  yield takeLatest(actionType.SEARCH_REPO, allSagas.repoSearchSaga);
  yield takeLatest(actionType.FETCH_BOOKMARKS, allSagas.fetchBookmarkSaga);
  yield takeLatest(actionType.DELETE_FILE, allSagas.deleteFileSaga);
  yield takeLatest(actionType.ADD_BOOKMARK, allSagas.addBookmarkSaga);
}

