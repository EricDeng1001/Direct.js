import {
  TOGGLE_LOCATION,
  GET_LOCATION
} from 'actionTypes';

export const toggleLocation = () => ({
  type: TOGGLE_LOCATION
});

const getLocationStart = () => ({
  type: GET_LOCATION.pending
});

const getLocationSucceed = ( response ) => ({
  type: GET_LOCATION.succeed,
  payload: {
    response: response
  }
});

const getLocationFailed = ( reason ) => ({
  type: GET_LOCATION.failed,
  payload: {
    reason: reason
  }
});

let getId = 0;
export const getLocation = () => ( dispatch , getState ) => {
  const oldState = getState();
  const requestId = ++getId;
  const dispatchNewest = ( action ) => {
    if( getId === requestId ){
      dispatch( action );
    }
  };
  dispatch( getLocationStart() );
  fetch( 'api/ws/location/v1/ip?key=KYKBZ-VKHWX-4H346-7XAJI-ETITZ-2OBL5' )
  .then( response => {
    if( !response.ok ){
      throw response.status;
    }
    response.json()
    .then( json => dispatchNewest( getLocationSucceed( json ) ) )
    .catch( err => {
      dispatchNewest( getLocationFailed( "json" ) );
      console.log( "json parse err: " , err );
    })
  })
  .catch( err => {
    dispatchNewest( getLocationFailed( "network" ) );
    console.log( "network err: " , err )
  });
};
