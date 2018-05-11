import io from "socket.io-client";

import { socket as socketConfig } from "Core/App";

var socket = io( socketConfig );

export default socket;
