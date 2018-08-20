import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import storeConfig from "./store/storeCofig";
import { Provider } from "react-redux";

const store = storeConfig();

ReactDOM.render(
  <Provider store={store}>
        
            <App/>
        
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
