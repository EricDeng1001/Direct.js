import {
  LOGIN
} from 'actionTypes';

import jsonToUrlencoded from 'Algorithm/jsonToUrlencoded';

const startLogin = ({ username , password }) => ({
  type: LOGIN.pending,
  payload: {
    username,
    password
  }
});

const loginSucceed = ( response ) => ({
  type: LOGIN.resolved,
  payload: {
    response
  }
});

const loginFailed = ( reason ) => ({
    type: LOGIN.rejected,
    payload: {
      reason
    }
});

let reqNum = 0;
export const login = ({ username , password }) => ( dispatch ) => {
  dispatch( startLogin({ username , password }) );
  const reqId = ++reqNum;
  const dispatchNewest = action => {
    if( reqId === reqNum ){
      dispatch( action );
    }
  }

  fetch( 'http://139.129.210.230/LearningSystem/BackEnd/new_login.php' , {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: jsonToUrlencoded({
      username,
      password
    })
  })
  .then( response => {
    if( !response.ok ){
      throw new Error(" response not ok with:" + response.status );
    }
    response.json()
    .then( json => dispatchNewest( loginSucceed( json ) ) )
    .catch( err => {
      console.log( "json parse err:" + err );
      dispatchNewest( loginFailed( "json" ) );
    })
  })
  .catch( err => {
    console.log( "network err:" + err );
    dispatchNewest( loginFailed( "network" ) );
  });
}
