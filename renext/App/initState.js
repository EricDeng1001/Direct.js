import merge from 'renext-core/Algorithm/mergeObject';

import reducerConfig from 'Config/reducer';

const keys = Object.keys( reducerConfig );

const initState = {};

for( let i = 0 ; i < keys.length ; i++ ){
  initState[keys[i]] = reducerConfig[keys[i]]( undefined , { type: '@@RenextJS/RestoreLastState' });
}

let lastState;
try {
  lastState = JSON.parse( localStorage.lastState );
}
catch ( e ){
  lastState = {};
}

merge( initState , lastState );

export default initState;
