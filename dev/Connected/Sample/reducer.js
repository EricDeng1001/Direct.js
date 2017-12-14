import {
  TOGGLE_LOCATION,
  GET_LOCATION
} from 'actionTypes';

//import Algorithm from 'Algorithm/floyed'

export default (
  state = {
    show: false,
    loading: false,
    loaded: 0,
    lastFailedReason: '',
    lat: -99999,
    lng: -99999
  },
  { type , payload , id }
) => {
  switch( type ){
    case TOGGLE_LOCATION:
      return {...state,
        show: !state.show
      };
    case GET_LOCATION.pending:
      return {...state,
        loading: true
      };
    case GET_LOCATION.succeed:
      return {...state,
        loading: false,
        loaded: state.loaded + 1,
        lat: payload.response.result.location.lat,
        lng: payload.response.result.location.lng
      };
    case GET_LOCATION.failed:
      return {...state,
        loading: false,
        lastFailedReason: payload.reason
      };
    default:
    return state;
  }
}
