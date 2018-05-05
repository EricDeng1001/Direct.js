import React from "react";

import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import extract from "direct-core/Algorithm/extractObject";

import AppConfig from "Core/App";

import socket from "./socket";

import App from "./App";

import store from "./store";

const { onAppWillMount , onAppWillClose , persistentState } = AppConfig;

window.addEventListener( "load" , () => {
  onAppWillMount( store.getState(), store.dispatch.bind( store ), socket );
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("reactRoot")
  );
});

window.addEventListener( "beforeunload" , () => {

  onAppWillClose( store.getState() , persistentState , socket );

  const stateToStore = extract( store.getState() , persistentState );

  localStorage.lastState = JSON.stringify( stateToStore );

});
