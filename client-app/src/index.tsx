import React from "react";
import ReactDOM from "react-dom";
import "./App/layout/style.css";
import 'react-toastify/dist/ReactToastify.min.css'
import * as serviceWorker from "./serviceWorker";
import App from "./App/layout/App";
import {Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import ScrollToTop from "./App/layout/ScrollToTop";
export const history=createBrowserHistory();
ReactDOM.render(
  <Router history={history}>
   <ScrollToTop>
    <App />
  </ScrollToTop >
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
