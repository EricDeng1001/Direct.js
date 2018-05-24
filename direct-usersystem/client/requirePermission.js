import protect from "direct-core/protect";

import {
  __root__
} from "Constant/Roles";

import permissions from "Constant/PermissionFrontend";

export default protect({
  authenticated: {
    satisfy( authenticated ){
      return authenticated === true;
    },
    block(){
      this.notAuthorized();
    }
  },
  roles: {
    satisfy( roles ){
      if( roles.get( 0 ) === __root__ ){
        return true;
      }

      for( let role of roles ){
        if( permissions[role].indexOf( this.path ) !== -1 ){
          return true;
        }
      }
      return false;
    },
    block(){
      this.notAuthorized();
    }
  },
});
