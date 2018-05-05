import io from "socket.io-client";

import { socket as socketConfig } from "Core/App";

var socket = io( socketConfig );

socket.io.opts.transports = ["polling", "websocket"];

export default socket;
