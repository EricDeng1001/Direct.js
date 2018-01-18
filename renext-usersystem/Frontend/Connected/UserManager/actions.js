import {
  __ASYNC_LOGIN,
  __ASYNC_LOGOUT,
  __ASYNC_READ_USER_INFO,
  __ASYNC_SIGNUP,
  __TOGGLE_KEEP_LOGIN,
  __TOGGLE_REMEMBER_PASSWORD
} from 'actionTypes';


/*
defineSyncActionCreator toggleRememberPassword start
*/
let toggleRememberPasswordCounter = 0;
export const toggleRememberPassword = () => ({
    type: __TOGGLE_REMEMBER_PASSWORD,
    id: toggleRememberPasswordCounter++
});
/*
defineSyncActionCreator toggleRememberPassword end
*/
/*
defineSyncActionCreator toggleKeepLogin start
*/
let toggleKeepLoginCounter = 0;
export const toggleKeepLogin = socket => ( dispatch ) => {
    socket.emit( "toggleKeepLogin" , () => {
      console.log("server knows");
    });
    dispatch({
      type: __TOGGLE_KEEP_LOGIN,
      id: toggleKeepLoginCounter++
    });
};
/*
defineSyncActionCreator toggleKeepLogin end
*/
/*
defineAsyncActionCreator signup start
*/
let signupCounter = 0;
const signupStart = ({ cert , password }) => ({
    type: __ASYNC_SIGNUP.pending,
    payload: {
      cert,
      password
    },
    id: signupCounter
});
const signupResolved = ( response ) => ({
    type: __ASYNC_SIGNUP.resolved,
    payload: {
      response
    },
    id: signupCounter
});
const signupRejected = ( reason , detail ) => ({
    type: __ASYNC_SIGNUP.rejected,
    payload: {
      reason,
      detail
    },
    id: signupCounter
});

export const signup = ({ cert , password }) => ( dispatch , getState ) => {
  const reqId = ++signupCounter;
  const dispatchLastest = action => {
    if( reqId === signupCounter ){
      dispatch( action );
    }
  }
  dispatch( signupStart({ cert , password }) );
  fetch( "/signup" , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cert,
        password
      })
  })
  .then( response => {
    if( !response.ok ){
      dispatchLastest( signupRejected( "server" , response.status ) );
      return;
    }
    response.json()
    .then( json => dispatchLastest( signupResolved( json ) ) )
    .catch( err => {
      dispatchLastest( signupRejected( "json" , err ) )
    });
  })
  .catch( err => {
      dispatchLastest( signupRejected( "network" , err ) );
  });
};

/*
defineAsyncActionCreator signup end
*/
/*
defineAsyncActionCreator login start
*/
let loginCounter = 0;
const loginStart = ({ cert , password }) => ({
    type: __ASYNC_LOGIN.pending,
    payload: {
      cert,
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

export const login = ({ cert , password }) => ( dispatch ) => {
  const reqId = ++loginCounter;
  const dispatchLastest = action => {
    if( reqId === loginCounter ){
      dispatch( action );
    }
  }
  dispatch( loginStart( { cert , password }) );
  fetch( "/login" , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cert,
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

/*
defineAsyncActionCreator logout start
*/
let logoutCounter = 0;
const logoutStart = () => ({
    type: __ASYNC_LOGOUT.pending,
    payload: {

    },
    id: logoutCounter
});
const logoutResolved = ( response ) => ({
    type: __ASYNC_LOGOUT.resolved,
    payload: {
      response
    },
    id: logoutCounter
});
const logoutRejected = ( reason , detail ) => ({
    type: __ASYNC_LOGOUT.rejected,
    payload: {
      reason,
      detail
    },
    id: logoutCounter
});

export const logout = () => ( dispatch , getState ) => {
  const { UserManager: { token , userid }} = getState();
  const reqId = ++logoutCounter;
  const dispatchLastest = action => {
    if( reqId === logoutCounter ){
      dispatch( action );
    }
  }
  dispatch( logoutStart() );
  fetch( "/logout" , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        userid
      })
  })
  .then( response => {
    if( !response.ok ){
      dispatchLastest( logoutRejected( "server" , response.status ) );
      return;
    }
  })
  .catch( err => {
      dispatchLastest( logoutRejected( "network" , err ) );
  });
};

/*
defineAsyncActionCreator logout end
*/
