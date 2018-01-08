function mergeArraysIntoOne( keyToValueObj ){
  var keys = Object.keys( keyToValueObj );
  var len = keyToValueObj[keys[0]].length;
  var res = [];
  var tmp;
  for( let i = 0 ; i < len ; i++ ){
    tmp = {};
    for( let j = 0 ; j < keys.length ; j++ ){
      tmp[keys[j]] = keyToValueObj[keys[j]][i];
    }
    res.push( tmp );
  }
  return res;
}

module.exports = mergeArraysIntoOne;
