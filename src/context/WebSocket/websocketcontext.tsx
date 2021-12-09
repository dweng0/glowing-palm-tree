import React, { createContext, useState, useEffect, useRef } from 'react';

import { WebsocketStatus, SocketState, WebsocketResponse } from './interface';
import { websocketContextErrorBoundary } from './errorboundaries';

// default data for the context
const DEFAULT_DATA: WebsocketResponse = {
    data: null,
    message: '',
    state: "CLOSED",
    socket: null
}

const WebSocketContext = createContext<WebsocketResponse>(DEFAULT_DATA);

/**
 * Higher order component that handles setting up websockets and provides state/data and the websocket for context
 * IT: Abstracts the websocket connection, provides a layer for ui error handling. provides state, data and websocket to consumers
 */
const SocketContextProvider: React.FunctionComponent<WebsocketStatus> = ({socketUrl, children}) => { 
    
    // Error Boundary
    websocketContextErrorBoundary(socketUrl);
    
    //setup state
    const [socketSatus, setSocketStatus] = useState<SocketState>({state: DEFAULT_DATA.state, message: ''});
    const [response, setResponse] = useState<any>(null);
    const webSocket = useRef<WebSocket | null>(null);

    /**
     * IT: makes an initial call to open up a websocket 
     * WHEN: provided a url
     */
    useEffect(() => { 
        try {
             // create the socket, handle the different states
                webSocket.current = new WebSocket(socketUrl);
                webSocket.current.onopen = (event: Event) => setSocketStatus({state:"OPEN", message: "socket open"});
                webSocket.current.onclose = (event: Event) => setSocketStatus({state: "CLOSED", message: "Socket connection closed"});
                webSocket.current.onerror = (event: Event) => setSocketStatus({state: "ERROR", message: "An error has occurred on the websocket"});
                webSocket.current.onmessage = (event: any) => setResponse(event.data); //event type doesn't containt data here... looks like lib needs updating.


            } catch {
                setSocketStatus({state: "ERROR", message: "Payload to send over websockets was malformed"});
            }
            
            // clean up
            return () => { 
                setSocketStatus({state: "CLOSING", message: "Socket connection is closing..."});
                 if(webSocket !== null && webSocket.current !== null) {
                    webSocket.current.close();
                 }
            }

    }, [setSocketStatus, setResponse, socketUrl]);

    // Render the context, expose data plus the socket and its state
    return (
        <WebSocketContext.Provider value={{...{data: response, socket: webSocket.current }, ...socketSatus}}>
            {children}
        </WebSocketContext.Provider>
    );
}

export default SocketContextProvider;