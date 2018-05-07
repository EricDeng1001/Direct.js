export default ( HOCarray, Comp ) => {
  if( !Array.isArray( HOCarray ) ){
    throw "first argument must be an array";
  }
  for( let HOC of HOCarray ){
    Comp = HOC( Comp );
  }
  return Comp;
};
