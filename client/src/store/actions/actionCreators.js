import * as actionType from "./actionTypes";
import jwt_decode from 'jwt-decode'


// actions responsble for SIGN UP AND LOG IN 
export const initStoreUser = (data,history) => {
  return {
    type:actionType.INIT_STORE_USER,
    user:data,
    history
  };
};
export const authUser = () => {
  const token = localStorage.getItem('token')
 
  if(token){
    const user = jwt_decode(token);
    return {
    type:actionType.AUTH_USER,
    user
   
  }}
 return { type: actionType.AUTH_USER, user:null };
}

export const logOut = ( )=> {
  localStorage.removeItem('token')
  
  return {
    type:actionType.LOGOUT_USER,
    
  
  }
};
export const initUserSignUp = (data,history) => {
  return {
    type:actionType.INIT_USER_SIGN_UP,
    user:data,
    history
  };
};
export const userSignUp = ()=> {
  return {
    type:actionType.USER_SIGN_UP,
    
  };
};

export const saveErrors = (err)=> {
  return {
    type:actionType.SAVE_ERRORS,
    err
  };
};





// Actions responsible for FILE UPLOAD and DELETE


export const searchRepo = (search)=> {
  
  return {
    type:actionType.SEARCH_REPO,
    search
  };
};
export const addBookmark = (info)=> {
  
  return {
    type:actionType.ADD_BOOKMARK,
    info
  };
};

export const fetchBookmarks= ( )=> {
 
  return {
    type:actionType.FETCH_BOOKMARKS,
   
  };
};

export const storeFetchedBookmarks= ( bookmarks)=> {
 
  return {
    type:actionType.STORE_FETCHED_BOOKMARKS,
    bookmarks
  };
};
export const storeFetchedRepos = (repos)=> {
 
  return {
    type:actionType.STORE_FETCHED_REPO,
    repos
  };
};
export const deleteFile = (id)=> {
 
  return {
    type:actionType.DELETE_FILE,
    id
  };
};

export const storeServerResponse = (res)=> {
 
  return {
    type:actionType.SERVER_RESPONSE,
    res
  };
};

export const toggleLoader= (arg) =>{
  console.log(arg)
  return {
    type:actionType.TOGGLE_LOADER,
    arg
}}