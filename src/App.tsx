
import './App.css';
import SocketContextProvider from './context/WebSocket/websocketcontext';
import Container from '@mui/material/Container';
import { WEBSOCKET_URI } from './contants/datalayer';

function App() {
  return (
    <SocketContextProvider socketUrl={WEBSOCKET_URI}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
    </SocketContextProvider>
  );
}

export default App;
