const isObject = require('./isObject');

function merge( target , obj ){
  const keys = Object.keys( obj );
  for( let i = 0 ; i < keys.length ; i++ ){
    if( isObject( obj[keys[i]] ) ){
      if( !isObject( target[keys[i]] ) ){
        target[keys[i]] = {};
      }
      merge( target[keys[i]] , obj[keys[i]] );
    }
    else {
      if( keys[i] in target ){
        continue;
      }
      target[keys[i]] = obj[keys[i]];
    }
  }
}

module.exports = merge;
