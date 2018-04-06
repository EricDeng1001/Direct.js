import React from 'react';

import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import App from 'App';

import extract from "direct-core/Algorithm/extractObject";

import socket from "direct-core/socket";

const loadStore = () => import(/* webpackChunkName: "store" */ 'store');

const loadAppLifeCycle = () => import(/* webpackChunkName: "AppLifeCycle" */ 'Config/AppLifeCycle');

const loadPersistentState = () => import(/* webpackChunkName: "persistentState" */ 'Config/persistentState');


(async function loadConfigComplete(){
  var AppLifeCycle = loadAppLifeCycle();
  var persistentState = loadPersistentState();
  var store = loadStore();
  console.log( store );
  AppLifeCycle = (await AppLifeCycle).default;
  persistentState = (await persistentState).default;
  store = (await store).default;
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('reactRoot')
  );


  const { onAppWillMount , onAppWillClose } = AppLifeCycle;

  window.addEventListener( "load" , () => {
    onAppWillMount( socket , store.dispatch.bind( store ) );
  });

  window.addEventListener( "beforeunload" , () => {
    var resolved = false;
    try {
      onAppWillClose( () => resolved = true , store.getState() , persistentState , socket );
    }
    catch ( e ){
      console.log( e );
    }
    var a = Date.now();
    while( true ){
      if( resolved ){
        break;
      }
      if( Date.now() > a + 6000 ){
        break;
      }
    }
    const stateToStore = extract( store.getState() ,  persistentState , socket );

    localStorage.lastState = JSON.stringify(  stateToStore );

  });
})();
