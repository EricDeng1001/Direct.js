import React from 'react';
import socket from 'simple-direct/App/socket';
export default Comp => props => ( <Comp {...props} socket={socket} /> );
