import io from 'socket.io-client';

import { socket as socketConfig } from "Config/App";
var socket = io( socketConfig );

socket.io.opts.transports = ['polling', 'websocket'];

var failed = 0;
var time = 2;

socket.on( 'reconnect_attempt' , () => {
  failed++;
  if( failed >= 3 ){
    console.log("aborting tcp connection");
    time += 1;
    socket.close();
    if( time === 7 ){
      time = 120;
    }
    console.log(`aborted , next reonnecting started at ${time}s`);
    setTimeout( () => {
      failed = 0;
      socket.connect();
    }, time * 1000 )
  }
});

export default socket;
