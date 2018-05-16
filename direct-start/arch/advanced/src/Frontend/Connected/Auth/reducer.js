import {
  __logout__,
  __createAuth__,
  __getAuth__
} from "./actionTypes";

import { Map as ImmutableMap, List as ImmutableList } from "immutable";

export default ( state = new ImmutableMap({
  certification: "",
  password: "",
  authorized: false,
  token: "",
  authorizing: false,
  authorizedAt: null,
  permission: {
    allowed: ["readPublic"],
    banned: [""]
  },
  reason: ""
}), { type, payload, id } ) => {
  switch( type ){
    case __logout__: {
      return state.merge({
        authorized: false,
        token: ""
      });
    }

    case __createAuth__.pending:
    case __getAuth__.pending: {
      let { certification, password } = payload;
      return state.merge({
        reason: "",
        authorizing: true,
        authorized: false,
        certification,
        password
      });
    }

    case __createAuth__.resolved:
    case __getAuth__.resolved: {
      let { permission, token } = payload;
      return state.merge({
        permission,
        token,
        authorizing: false,
        authorized: true,
        authorizedAt: Date.now()
      });
    }

    case __createAuth__.rejected:
    case __getAuth__.rejected: {
      return state.merge({
        reason: payload,
        authorizing: false
      });
    }

    default: {
      return state;
    }
  }
};
