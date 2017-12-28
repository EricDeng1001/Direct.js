export default ( resList ) => {
  var calced = 0;
  for( res in resList ){
    calced += ( res.level + 1 ) * 100 * res.correct;
  }
}
