import {
  __logout__,
  __createAuth__,
  __getAuth__
} from "./actionTypes";

import { Map as ImmutableMap, List as ImmutableList } from "immutable";

export default ( state = new ImmutableMap({
  certification: "",
  password: "",
  authenticated: false,
  authenticating: false,
  authenticatedAt: null,
  roles: new ImmutableList(),
  reason: ""
}), { type, payload, id } ) => {
  switch( type ){
    case __logout__.pending:
    case __logout__.resolved:
    case __logout__.rejected: {
      return state.set( "authenticated", false );
    }

    case __createAuth__.pending:
    case __getAuth__.pending: {
      let { certification, password } = payload;
      return state.merge({
        reason: "",
        authenticating: true,
        authenticated: false,
        certification,
        password
      });
    }

    case __createAuth__.resolved:
    case __getAuth__.resolved: {
      let { roles } = payload;
      return state.merge({
        roles,
        authenticating: false,
        authenticated: true,
        authenticatedAt: Date.now()
      });
    }

    case __createAuth__.rejected:
    case __getAuth__.rejected: {
      return state.merge({
        reason: payload,
        authenticating: false
      });
    }

    default: {
      return state;
    }
  }
};
