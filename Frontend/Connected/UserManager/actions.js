import {
  __ASYNC_LOGIN
} from 'actionTypes';

/*
defineAsyncActionCreator login start
*/
let loginCounter = 0;
const loginStart = ({ userid , password }) => ({
    type: __ASYNC_LOGIN.pending,
    payload: {
      userid,
      password
    },
    id: loginCounter
});
const loginResolved = ( response ) => ({
    type: __ASYNC_LOGIN.resolved,
    payload: {
      response
    },
    id: loginCounter
});
const loginRejected = ( reason , detail ) => ({
    type: __ASYNC_LOGIN.rejected,
    payload: {
      reason,
      detail
    },
    id: loginCounter
});

export const login = ({ userid , password }) => ( dispatch ) => {
  const reqId = ++loginCounter;
  const dispatchLastest = action => {
    if( reqId === loginCounter ){
      dispatch( action );
    }
  }
  dispatch( loginStart( { userid , password }) );
  fetch( "/login" , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userid,
        password
      })
  })
  .then( response => {
    if( !response.ok ){
      dispatchLastest( loginRejected( "server" , response.status ) );
      return;
    }
    response.json()
    .then( json => dispatchLastest( loginResolved( json ) ) )
    .catch( err => {
      dispatchLastest( loginRejected( "json" , err ) )
    });
  })
  .catch( err => {
      dispatchLastest( loginRejected( "network" , err ) );
  });
};

/*
defineAsyncActionCreator login end
*/
