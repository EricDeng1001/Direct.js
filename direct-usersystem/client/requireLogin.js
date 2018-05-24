import protect from "direct-core/protect";

export default protect({
  authenticated: {
    satisfy( a ){
      return a === true;
    },
    block(){
      this.notAuthenticated();
    }
  }
});
