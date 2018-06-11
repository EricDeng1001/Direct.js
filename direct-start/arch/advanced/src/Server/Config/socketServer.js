const {
  __chatSocketEventName__,
  __authorizeEventName__
} = require("../Constant/SocketEventName");

var cache = [];
module.exports = socketServer => {
  socketServer.on( "connection", ( socket ) => {

    socket.on( __chatSocketEventName__.clientSendMessage, ( json, ack ) => {
      cache.push( json );
      if( cache.length > 100 ){
        cahce = [];
      }
      ack( 200 );
      socket.broadcast.emit( __chatSocketEventName__.serverPushMessage, json );
    });

    socket.on( __chatSocketEventName__.queryHistory, () => {
      socket.emit( __chatSocketEventName__.queryHistory, cache );
    });

    socket.on( __authorizeEventName__.checkAuthState, ( token, ack ) => {
      const session = socket.request.session;
      //console.log( session );
      if( session.authorized === token ){
        ack( true );
      } else {
        ack( false );
      }
    })
  });
}
