import merge from 'Algorithm/mergeObject';

import reducerConfig from 'Config/reducer';

const keys = Object.keys( reducerConfig );

const initState = {};

for( let i = 0 ; i < keys.length ; i++ ){
  initState[keys[i]] = reducerConfig[keys[i]]( undefined , { type: 'ReNextJSRestoreLastState' });
}

const lastState = JSON.parse( localStorage.lastState );

merge( initState , lastState );

export default initState;
