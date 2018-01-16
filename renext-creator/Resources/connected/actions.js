import {

} from 'actionTypes';

/*
defineSyncActionCreator name  start
*/
let actionsCreatorNameCounter = 0;
export const actionsCreatorName = (args) => ({
    type: __type,
    payload: {

    },
    id: actionsCreatorNameCounter++
});
/*
defineSyncActionCreator  name end
*/



/*
defineAsyncActionCreator  name start
*/
let actionNameCounter = 0;
const actionNameStart = () => ({
    type: __ASYNC_typeName.pending,
    payload: {

    },
    id: actionNameCounter
});
const actionNameResolved = ( response ) => ({
    type: __ASYNC_typeName.resolved,
    payload: {
      response
    },
    id: actionNameCounter
});
const actionNameRejected = ( reason , detail ) => ({
    type: __ASYNC_typeName.rejected,
    payload: {
      reason,
      detail
    },
    id: actionNameCounter
});

export const actionName = (args) => ( dispatch , getState ) => {
  const oldState = getState();
  const reqId = ++actionNameCounter;
  const dispatchLastest = action => {
    if( reqId === actionNameCounter ){
      dispatch( action );
    }
  }
  dispatch( actionNameStart() );
  //could be socket
  fetch( url , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body:
  })
  .then( response => {
    if( !response.ok ){
      dispatchLastest( actionNameRejected( "server" , response.status ) );
      return;
    }
    response.json()
    .then( json => dispatchLastest( actionNameResolved( json ) ) )
    .catch( err => {
      dispatchLastest( actionNameRejected( "json" , err ) )
    });
  })
  .catch( err => {
      dispatchLastest( actionNameRejected( "network" , err ) );
  });
};

/*
defineAsyncActionCreator name  end
*/
