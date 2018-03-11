module.exports = socketServer => {
  socketServer.on("connection" , socket => {
    socket.emit("connected",  Date.now() );
    socket.on("disconnect" , () => {
      socketServer.emit("socketDisconnect");
    });
    socket.on("send message" , json => {
      socketServer.emit("get message" , json );
    })
  });
}
