import React, { useContext, useReducer, useState, useEffect} from "react";
import { SocketPayload } from "../WebSocket/interface";
import { useWebSocket } from "../WebSocket";
import { CryptoFeed, CryptoFeedDelta } from "../../interface";
import { bufferWriter } from "./services/buffer";
import { SubscriptionProviderProps, SubscriptionContextReturnType } from "./interface";
import { subscribeReducer } from "./services/reducer";
import { messageFilter } from "./services/messagefilter";
import { getSocket } from "./services/socketfetcher";

// Create context privately
const SubscriptionContext = React.createContext<SubscriptionContextReturnType | undefined>(undefined);

/**
 * handles messages to/from websockets
 * @param 
 */
const SubscriptionProvider = ({children}: SubscriptionProviderProps) => {

    // pull in websockets and setup some state
    const {socket} = useWebSocket();
    const [delta, setDelta] = useState();
    const [dataset, setDataset] = useState();

    // setup message filter and buffer
    const { filter } = messageFilter(setDataset, setDelta)
    const { buffer, clear } = bufferWriter<CryptoFeed>(filter, 2000);

    console.log('initial', dataset);
    console.log('delta', delta);

    // IT: pushes socket messages into the buffer
    // WHEN: we have a socket.
    useEffect(() => { 
        if(socket) { 
            socket.onmessage = (response: MessageEvent) =>  buffer.add(response.data);
        }
        return () => clear();
    }, [socket, buffer, clear]);

    // IT: Provides a reducer
    // FOR: Changing subscriptions/currencies
    const [socketState, dispatch] = useReducer(subscribeReducer, { 
        event: "subscribe",
        feed: "book_ui_1",
        product_ids: ["PI_XBTUSD"]
    });
    
    switch(socketState.event) {
        case "subscribe":
            getSocket(socket)
            .then(websocket => {
                websocket.send(JSON.stringify(socketState));
                dispatch({type: "subscribed"}); 
            });
            
            break;
        case "unsubscribe":
            getSocket(socket).then(websocket => websocket.send(JSON.stringify(socketState)));            
            break;
        case "togglefeed": 
            // unsub
            const previousFeed = (socketState.product_ids[0] === "PI_XBTUSD") ? ["PI_ETHUSD"] : ["PI_XBTUSD"];
            const unsubscribe = {...socketState, ...{event: "unsubscribe" as "unsubscribe" , product_ids: previousFeed}}; 
            
            getSocket(socket)
            .then(websocket => {
                websocket.send(JSON.stringify(unsubscribe));
                dispatch({type: "subscribe"}); 
            });
            break;
        default: 
            console.log(`unknown feed provided ${socketState.event}`)
    }

    const value: SubscriptionContextReturnType  = {state: socketState, dispatch, dataset: dataset as unknown as CryptoFeed, delta: delta as unknown as CryptoFeedDelta };
    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
}

const useSubscription = (): SubscriptionContextReturnType => {
  const context = useContext(SubscriptionContext) as unknown as SubscriptionContextReturnType;
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { useSubscription }

export default SubscriptionProvider;