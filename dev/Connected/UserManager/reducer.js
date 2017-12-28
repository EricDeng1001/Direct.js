import {
  LOGIN
} from 'actionTypes';

export default ( state = {
    logined: false,
    logining: false,
    rememberPassword: false,
    name: '',
    token: '',
    uid: 0,
    password: '',
    failed: false,
    networkError: false,
    serverError: false,
    validName: false,
    newTo: [],
} , { type , payload , id } ) => {
  const { content } = state;
  switch( type ){
    case LOGIN.pending:
      return {
        ...state,
        logining: true,
        name: payload.username,
        password: payload.password,
        networkError: false,
        serverError: false,
        failed: false,
        validName: false
      };

    case LOGIN.resolved:
      switch( payload.response.state ){
        case "success":
          return {
            ...state,
            logined: true,
            logining: false,
            validName: true,
            newTo: payload.response.newTo
          };
        case "none":
          return {
            ...state,
            logining: false,
            validName: false,
            failed: true
          };
        case "wrong":
          return {
            ...state,
            logining: false,
            validName: true,
            failed: true
          };
        default:
          return {
            ...state,
            networkError: true
          };
      }
    case LOGIN.rejected:
      if( payload.reason === "network" ){
        return {
          ...state,
          networkError: true,
          logining: false
        };
      }
      else {
        return {
          ...state,
          logining: false,
          serverError: true
        }
      }
    default:
      return state;
  }
}
