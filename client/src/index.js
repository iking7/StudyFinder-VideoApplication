import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { ContextProvider } from './SocketContext';

//The react application will control everything inside the root
//division tag in the html document. We use the context provider
//to access the connection and video data obtained using socket and
//peer.js.
 ReactDOM.render(
     <ContextProvider>

            <App />

     </ContextProvider>,
   document.getElementById('root')
 );