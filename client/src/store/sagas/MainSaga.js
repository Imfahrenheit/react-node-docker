import axios from "axios";
import { put } from "redux-saga/effects";
import * as allActions from "../actions/actionCreators";

const url = "http://localhost:8000/";

const createHeaders = token => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
};

export function* storeUserSaga(action) {
  try {
    const response = yield axios.post(`${url}user/login`, action.user, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    localStorage.setItem("token", response.data.token);

    yield put(allActions.authUser());
    yield action.history.push("/");
  } catch (error) {
    yield put(allActions.saveErrors(error.response.data.message));
    console.log(error.response.data.message);
  }
}
export function* userSignUpSaga(action) {
  try {
    const response = yield axios.post(`${url}user/signup`, action.user, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    yield action.history.push("/login");
    yield put(allActions.storeServerResponse(response.data.message));
  } catch (error) {
    yield put(allActions.saveErrors(error.response.data.message));
  }
}

export function* repoSearchSaga(action) {
  try {
    const token = yield localStorage.getItem("token");
    const headers = yield createHeaders(token);
    yield put(allActions.toggleLoader('open'))
    let response = yield axios.get(`${url}search/repositories/${action.search}`,  headers);
    yield put(allActions.toggleLoader('close'))
  yield put(allActions.storeFetchedRepos(response.data));
    yield put(allActions.storeServerResponse(response.data.message));
  } catch (error) {
    yield put(allActions.saveErrors(error.response.data.message));
  }
}
export function* addBookmarkSaga(action) {
  try {

    const token = yield localStorage.getItem("token");
    const headers = yield createHeaders(token);
    let response = yield axios.post(`${url}search`, action.info, headers);
 
    yield put(allActions.storeServerResponse(response.data.message));
  } catch (error) {
    yield put(allActions.saveErrors(error.response.data.message));
  }
}


export function* fetchBookmarkSaga(action) {
  try {
    const token = yield localStorage.getItem("token");
    const headers = yield createHeaders(token);
    let { data } = yield axios.get(`${url}search/allbookmarks`, headers);
  
   yield put(allActions.storeFetchedBookmarks(data.docs));
   
    yield put(allActions.storeServerResponse(data.message));
  } catch (error) {
    yield put(allActions.saveErrors(error.response.data.message));
  }
}

export function* deleteFileSaga(action) {
  try {
    const token = yield localStorage.getItem("token");
    const headers = yield createHeaders(token);
    let { data } = yield axios.delete(`${url}search/${action.id}`, headers);

    yield put(allActions.storeServerResponse(data.message));
  } catch (error) {
    yield put(allActions.saveErrors(error.response.data.message));
  }
}
