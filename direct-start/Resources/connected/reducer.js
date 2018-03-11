import {

} from 'actionTypes';


export default ( state = {
    defaultState,
    someNetworkState: {
      pending: 0,
      resolved: 0,
      rejected: 0,
      lastFailed: false,
      failedReason: "network", // "json" , "server"
      failedDetail: null
    },
  } , { payload , type , id } ) => {
    switch( type ){
      /*
      defineSyncActionReducer __name start
      */
      case __actionTypeName: {
        return {
          ...state,

        };
      }
      /*
      defineSyncActionReducer __name end
      */
      /*
      defineAsyncActionReducer __ start
      */
      case __ASYNC_actionName.pending: {
        let someNetworkState = { ...state.someNetworkState };
        someNetworkState.lastFailed = false;
        someNetworkState.pending++;
        return {
          ...state,
          someNetworkState,

        };
      }
      case __ASYNC_actionName.resolved: {
        let { response } = payload;
        let someNetworkState = { ...state.someNetworkState };
        someNetworkState.resolved++;
        someNetworkState.pending--;
        return {
          ...state,
          someNetworkState,

        };
      }
      case __ASYNC_actionName.rejected: {
        let { reason , detail } = payload;
        let someNetworkState = { ...state.someNetworkState };
        someNetworkState.rejected++;
        someNetworkState.pending--;
        someNetworkState.lastFailed = true;
        someNetworkState.failedReason = reason;
        someNetworkState.failedDetail = detail;
        return {
          ...state,
          someNetworkState,

        };
      }
      /*
      defineAsyncActionReducer __ end
      */
      default:
        return state;
    }
  }
