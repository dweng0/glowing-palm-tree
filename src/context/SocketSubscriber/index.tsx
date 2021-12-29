import React, { useContext, useReducer, useState, useEffect}        from "react";
import { SubscriptionProviderProps, SubscriptionContextReturnType } from "./interface";
import { useWebSocket }                 from "../WebSocket";
import { CryptoFeed, CryptoFeedDelta }  from "../../interface";
import { bufferWriter }                 from "./services/buffer";
import { subscribeReducer }             from "./services/reducer";
import { messageFilter }                from "./services/messagefilter";
import { getSocket }                    from "./services/socketfetcher";
import { UPDATE_SPEED }                 from "../../constants/datalayer";

// Create context privately
const SubscriptionContext = React.createContext<SubscriptionContextReturnType | undefined>(undefined);

/**
 * handles messages to/from websockets, provides a reducer for consumers to use
 */
const SubscriptionProvider = ({children}: SubscriptionProviderProps) => {

    // pull in websockets and setup some state
    const {socket, state} = useWebSocket();
    const [delta, setDelta] = useState();
    const [dataset, setDataset] = useState();

    // setup message filter and buffer
    const { filter } = messageFilter<CryptoFeed, CryptoFeedDelta>(setDataset, setDelta);
    const { add, clear } = bufferWriter<CryptoFeed>(filter, UPDATE_SPEED);

    // IT: pushes socket messages into the buffer
    // WHEN: we have a socket.
    useEffect(() => { 
        if(socket) { 
            socket.onmessage = (response: MessageEvent) => add(response.data);
        }
        return () => clear();
    }, [socket, add, clear]);

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
        case "subscribed":
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
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}

export { useSubscription }

export default SubscriptionProvider;