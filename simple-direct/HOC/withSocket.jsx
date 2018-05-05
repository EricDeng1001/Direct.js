import React from "react";
import socket from "./App/socket";
export default Comp => props => ( <Comp {...props} socket={socket} /> );
