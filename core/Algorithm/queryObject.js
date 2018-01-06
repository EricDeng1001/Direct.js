function __query( node , func , path , mountPoint , key ){
  var _path = [...path];
  _path.unshift( key );
  var isNode = typeof node === "object" && !Array.isArray( node ) && Object.keys( node ).length;

  if( isNode ){
    mountPoint[key] = {};
    var childrenKeys = Object.keys( node );
      for( var childKey of childrenKeys ){
        __query( node[childKey] , func , _path , mountPoint[key] , childKey );
      }
    return;
  };
  if( func({
    key,
    value: node,
    path
  })){
    mountPoint[key] = node;
  }
}

function query( obj , func ){
  var res = {};
  for( var key of Object.keys( obj ) ){
    __query( obj[key] , func , [] , res , key );
  }
  return res;
}

module.exports = query;
