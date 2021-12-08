import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SocketContextProvider from './context/WebSocket/websocketcontext';

ReactDOM.render(
  <React.StrictMode>
      <SocketContextProvider socketUrl={"wss://www.cryptofacilities.com/ws/v1"} payload={{"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]}}>
        <App />
      </SocketContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
