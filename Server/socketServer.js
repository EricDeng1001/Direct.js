module.exports = socketServer => {
  socketServer.on("connection" , socket => {
    socket.emit("connected",  Date.now() );
    socket.on("disconnect" , () => {
      socketServer.emit("socketDisconnect");
    });
  });
}
