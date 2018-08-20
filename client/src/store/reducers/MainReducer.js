import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn:false,
  serverErrors:null,
  bookmarks:null,
  user:null,
  repos:null,
  response:'',
  loader: false
  
};

export const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER:
      if (action.user) {
        return { ...state, isLoggedIn: true, user: action.user };
      }
      return { ...state };
    case actionTypes.LOGOUT_USER:
      return { ...state, isLoggedIn: false, user:null, bookmarks:null, repos:null, response:"" };

    case actionTypes.STORE_FETCHED_REPO:
      return { ...state, repos: action.repos };
    case actionTypes.STORE_FETCHED_BOOKMARKS:
      return { ...state, bookmarks: action.bookmarks };
    case actionTypes.ADD_BOOKMARK:
      return { ...state, repos: state.repos.filter(el => el.id !== action.info.id) };

    case actionTypes.SAVE_ERRORS:
      return { ...state, serverErrors: action.err };
    case actionTypes.DELETE_FILE:
      return { ...state, bookmarks: state.bookmarks.filter(el => el._id !== action.id) };
    case actionTypes.SERVER_RESPONSE:
      return { ...state, response: action.res };
    case actionTypes.TOGGLE_LOADER:
      return { ...state, loader: action.arg==='open'?true:false };
    default:
      return state;
  }
};
