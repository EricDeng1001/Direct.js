module.exports = socket => {
  socket.on( "toggleKeepLogin" , ack => {
    if( socket.request.session.keepLogin ){
      socket.request.session.keepLogin = false;
    } else {
      socket.request.session.keepLogin = true;
    }
    ack();
  });
  socket.on( "disconnect" , reason => {
    if( !socket.request.session.keepLogin ){
      //delete socket.request.session[socket.request.session.token];
      //delete socket.request.session.token;
      delete socket.request.session.logined;
    }
  });
};
