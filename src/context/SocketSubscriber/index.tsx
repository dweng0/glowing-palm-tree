import React, { useContext, useReducer, ReactNode, useState, useEffect} from "react";
import { SocketPayload } from "../WebSocket/interface";
import { useWebSocket } from "../WebSocket";
import { CryptoFeed } from "../../interface";
import { bufferWriter } from "./buffer";
import { Dispatch, SubscriptionProviderProps, SubscriptionContextReturnType } from "./interface";
import { subscribeReducer } from "./reducer";

// Create context privately
const SubscriptionContext = React.createContext<{state: SocketPayload; dispatch: Dispatch, feed:CryptoFeed} | undefined>(undefined);

/**
 * handles messages to/from websockets
 * @param 
 */
const SubscriptionProvider = ({children}: SubscriptionProviderProps) => {

    // pull in websockets and setup some state
    const {socket} = useWebSocket();
    const [feed, setFeed] = useState<CryptoFeed>();
    const [subscribed, setSubscribed] = useState<boolean>(false);

    // init a buffer
    const { buffer, clear } = bufferWriter<CryptoFeed>(setFeed, 50000);

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
        event: "subscribed",
        feed: "book_ui_1",
        product_ids: ["PI_XBTUSD"]
    });

    // optimistic message sending
    const send = (message: SocketPayload): void => { 
        if(socket !== null && socket.send !== null) { 
            socket.send(JSON.stringify(message));
        }
    }
    
    switch(socketState.event) {
        case "subscribe":
            send(socketState);
            dispatch({type: "subscribed"});
            break;
        case "unsubscribe":
            send(socketState);
            break;
        case "togglefeed": 
            // unsub
            const previousFeed = (socketState.product_ids[0] === "PI_XBTUSD") ? ["PI_ETHUSD"] : ["PI_XBTUSD"];
            const unsubscribe = {...socketState, ...{event: "unsubscribe" as "unsubscribe" , product_ids: previousFeed}}; 
            send(unsubscribe);

            dispatch({type: "subscribe"})
            break;
        default: 
            console.log(`unknown feed provided ${socketState.event}`)
    }

    const value = {state: socketState, dispatch, feed: feed as CryptoFeed, subscribed};
    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
}

const useSubscription = (): SubscriptionContextReturnType => {
  const context = useContext(SubscriptionContext) as SubscriptionContextReturnType;
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider")
  }
  return context
}

export { useSubscription }

export default SubscriptionProvider;