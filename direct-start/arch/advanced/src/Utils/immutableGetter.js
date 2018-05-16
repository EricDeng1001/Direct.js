module.exports = {
  get( obj, prop ){
    if( prop in obj && prop ){
      return obj[prop];
    }
    return obj.get( prop );
  }
};
