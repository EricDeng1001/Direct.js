function __extract( obj , condition , mountPoint ){
  const keys = Object.keys( condition );
  for( let i = 0 ; i < keys.length ; i++ ){
    if( condition[keys[i]] === true ){
      mountPoint[keys[i]] = obj[keys[i]];
    }
    else if( condition[keys[i]] === false ){
      continue;
    }
    else {
      mountPoint[keys[i]] = {};
      __extract( obj[keys[i]] , condition[keys[i]] , mountPoint[keys[i]] );
    }
  }
}

function extract( obj , condition ){
  const res = {};
  __extract( obj , condition , res );
  return res;
}

module.exports = extract;
