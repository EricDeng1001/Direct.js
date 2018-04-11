function jsonToUrlencoded( json ){
  if( Object.keys( json ).length === 0 ){
    return "";
  }
  var jsonString = JSON.stringify( json );
  jsonString = jsonString.slice( 1 , jsonString.length - 1 );
  var jsonArray = jsonString.split(',');
  var resString = "";
  for( var i = 0 ; i < jsonArray.length - 1; i ++ ){
    var [ key , value ] = jsonArray[i].split(':');
    key = key.slice( 1 , key.length -1 );
    if( value[0] === '"' ){
      value = value.slice( 1 , value.length -1 );
    }
    resString += `${key}=${value}&`;
  }
  var [ key , value ] = jsonArray[i].split(':');
  key = key.slice( 1 , key.length -1 );
  if( value[0] === '"' ){
    value = value.slice( 1 , value.length - 1);
  }
  resString += `${key}=${value}`;
  return resString;
}

module.exports = jsonToUrlencoded;
