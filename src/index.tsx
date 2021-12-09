import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {WEBSOCKET_URI} from "./contants/datalayer";

const theme = createTheme();
ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
            <App /> 
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
