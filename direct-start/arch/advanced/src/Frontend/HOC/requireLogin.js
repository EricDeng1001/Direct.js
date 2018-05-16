import protect from "direct-core/protect";

export default protect({
  authorized: {
    satisfy( a ){
      return a === true;
    },
    block(){
      this.props.history.push("/auth");
    }
  }
});
