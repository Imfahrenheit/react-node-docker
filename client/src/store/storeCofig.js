import { createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/RootReducer";
import createSagamiddleware from 'redux-saga';
import { watcherSaga } from "./sagas";

const conFigureStore = preloadeState => {
  const sagaMiddleware = createSagamiddleware();
  const middlewire = [sagaMiddleware];
  const middlewireEnhancer = applyMiddleware(...middlewire);
  const storeEnhancer = [middlewireEnhancer];
  const composedEnhancer = composeWithDevTools(...storeEnhancer);

  const store = createStore(rootReducer, preloadeState, composedEnhancer);

  sagaMiddleware.run(watcherSaga);
  return store;
};
export default conFigureStore;
