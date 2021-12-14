import React, { useContext, useReducer, ReactNode, useState, useEffect} from "react";
import { SocketPayload } from "../WebSocket/interface";
import { useWebSocket } from "../WebSocket";
import { CryptoFeed } from "../../interface";

type Action = {type:"subscribe" } | {type: "unsubscribe" } | {type: "togglefeed", payload: Array<string>}; 
type Dispatch = (action: Action) => void
type SubscriptionProviderProps = {children: ReactNode}

// Create context privately
const SubscriptionContext = React.createContext<{state: SocketPayload; dispatch: Dispatch, feed:CryptoFeed} | undefined>(undefined);

// Build subscribe reducer
export const subscribeReducer = (state:SocketPayload, action: Action): SocketPayload => { 
    switch (action.type) { 
        case "subscribe": 
        case "unsubscribe":
        return {...state, ...{event: action.type}};
        case "togglefeed":
            return {...state, ...{product_ids: action.payload, event: "togglefeed"}}
        default:
            throw new Error(`Type not supported`);
    }
}

/**
 * Provide context for handling subscriptions to the websocket
 * @param 
 */
const SubscriptionProvider = ({children}: SubscriptionProviderProps) => {

    // pull in websockets
    const {socket} = useWebSocket();
    
    // place to hold socketData
    const [feed, setFeed] = useState<CryptoFeed>();
    
    // provide the initial state
    const initialState: SocketPayload = { 
        event: "subscribed",
        feed: "book_ui_1",
        product_ids: ["PI_XBTUSD"]
    };

    // IT: ties up messages to the socket provider
    // WHEN: we have a socket.
    useEffect(() => { 
        if(socket && socket.onmessage) { 
            socket.onmessage = (response) => { 
               debugger;
                if(!response.data.event) {
                    setFeed(JSON.parse(response.data) as CryptoFeed)
                }
            }
        }
    }, [socket, setFeed]);
    // create the reducer
    const [socketState, dispatch] = useReducer(subscribeReducer, initialState);


    // optimistic message sending
    const send = (message: SocketPayload): void => { 
        if(socket !== null && socket.send !== null) { 
            socket.send(JSON.stringify(message));
        }
    }

    /**
     * determine what to do with sockets based on the changed state
     */
    switch(socketState.event) {
        case "subscribe":
        case "unsubscribe":
            send(socketState);
            break;
        case "togglefeed": 
            
            const previousFeed = (socketState.product_ids[0] === "PI_XBTUSD") ? ["PI_ETHUSD"] : ["PI_XBTUSD"];
            const unsubscribe = {...socketState, ...{event: "unsubscribe" as "unsubscribe" , product_ids: previousFeed}}; 
            send(unsubscribe);

            //then change feed
            send({...socketState, ...{event: "subscribe" as "subscribe"}});
        break;
    }

    const value = {state: socketState, dispatch, feed};
    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
}

// set the return type
export type subscriptionContextReturnType = {state: SocketPayload, dispatch: Dispatch, feed: CryptoFeed | undefined};

// expose the subscription
const useSubscription = (): subscriptionContextReturnType => {
  const context = useContext(SubscriptionContext) as {state:SocketPayload, dispatch: Dispatch, feed: CryptoFeed}
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider")
  }
  return context
}

export { useSubscription }

export default SubscriptionProvider;