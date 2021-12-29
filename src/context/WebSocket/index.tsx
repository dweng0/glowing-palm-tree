import React, { createContext, useState, useEffect, useRef, useContext } from "react";

import { WebsocketStatus, SocketState, WebsocketResponse } from "./interface";
import { websocketContextErrorBoundary } from "./errorboundaries";
import { MAX_CONNECTION_ATTEMPTS, RETRY_DEBOUNCE } from "../../constants/datalayer";

const WebSocketContext = createContext<WebsocketResponse | undefined>(undefined);

/**
 * Higher order component that handles setting up websockets and provides state and the websocket for context
 * IT: Abstracts the websocket connection, provides a layer for ui error handling. provides state, data and websocket to consumers
 */
const SocketContextProvider: React.FunctionComponent<WebsocketStatus> = ({socketUrl, children}) => { 
    
    // Error Boundary
    websocketContextErrorBoundary(socketUrl);
    
    //setup state
    const [socketSatus, setSocketStatus] = useState<SocketState>();
    const webSocket = useRef<WebSocket | null>(null);

    /**
     * IT: makes an initial call to open up a websocket 
     * WHEN: provided a url
     */
    useEffect(() => { 
        let timeoutId:Timeout;
        try {          
            const connect = () => {
                // create the socket, handle the different states
                webSocket.current = new WebSocket(socketUrl);
                
                // open, happy, set status
                webSocket.current.onopen = (event: Event)  => {

                    // clear any timeouts we may have
                    if(timeoutId) { 
                        clearTimeout(timeoutId);
                    }

                    setSocketStatus({state:"OPEN", message: "socket open"});
                }

                // closed, maybe sad, retry.
                webSocket.current.onclose = (event: Event) => {
                    setSocketStatus({state: "CONNECTING", message: "Socket connection closed, retrying "});
                    timeoutId = setTimeout(connect, RETRY_DEBOUNCE);
                }

                // fatal error, dont bother retrying
                webSocket.current.onerror = (event: Event) => setSocketStatus({state: "ERROR", message: "An error has occurred on the websocket"});
            };
            connect();

            } catch {
                setSocketStatus({state: "ERROR", message: "Payload to send over websockets was malformed"});
            }
            
            // clean up
            return () => { 
                setSocketStatus({state: "CLOSING", message: "Socket connection is closing..."});
                 if(webSocket !== null && webSocket.current !== null) {
                    webSocket.current.close();
                 }
                 if(timeoutId) {
                     clearTimeout(timeoutId);
                 }
            }

    }, [setSocketStatus, socketUrl]);

    // Normalise values before placing it into the context

    const value:WebsocketResponse  = {
        message: (socketSatus && socketSatus.message) ? socketSatus.message : "",
        socket: webSocket.current,
        state: (socketSatus && socketSatus.state) ? socketSatus.state : "CLOSED"
    };

    // Render the context, expose data plus the socket and its state
    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
}

/**
 * A consumer hook exposes websockets at any layer of component depth provided they are wrapped in a provider(IOC)
 * WebSocketContext is not exported -on purpose- to control its usage.
 */
export const useWebSocket = (): WebsocketResponse => { 
    const websocketContext = useContext(WebSocketContext);

    if(websocketContext === undefined) { 
        throw new Error("Please use in conjunction with a context provider")
    }

    return websocketContext;
}

export default SocketContextProvider;