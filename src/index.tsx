import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SocketContextProvider from './context/WebSocket/websocketcontext';
import {WEBSOCKET_URI} from "./contants/datalayer";
ReactDOM.render(
  <React.StrictMode>
      <SocketContextProvider socketUrl={WEBSOCKET_URI}>
        <App />
      </SocketContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
