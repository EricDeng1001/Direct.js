import io from 'socket.io-client';

import socketConfig from "Config/socket";
let socket = io( socketConfig );

socket.io.opts.transports = ['polling', 'websocket'];

let failed = 0
socket.on( 'reconnect_attempt' , () => {
  failed++;
  if( failed > 10 ){
    socket.close();
    console.log("aborting tcp connection")
  }
});

export default socket;
