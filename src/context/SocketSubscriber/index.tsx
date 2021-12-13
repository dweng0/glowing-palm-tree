import React, { useContext, useReducer, ReactNode} from "react";
import { SocketPayload } from "../WebSocket/interface";
import { useWebSocket } from "../WebSocket";

type Action = {type:"subscribe" } | {type: "unsubscribe" } | {type: "togglefeed", payload: Array<string>}; 
type Dispatch = (action: Action) => void
type SubscriptionProviderProps = {children: ReactNode}

// Create context privately
const SubscriptionContext = React.createContext<{state: SocketPayload; dispatch: Dispatch} | undefined>(undefined);

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
    
    // provide the initial state
    const initialState: SocketPayload = { 
        event: "subscribed",
        feed: "book_ui_1",
        product_ids: ["PI_XBTUSD"]
    };

    // create the reducer
    const [data, dispatch] = useReducer(subscribeReducer, initialState);

    // optimistic message sending
    const send = (message: SocketPayload): void => { 
        if(socket !== null && socket.send !== null) { 
            socket.send(JSON.stringify(message));
        }
    }

    /**
     * determine what to do with sockets based on the changed state
     */
    switch(data.event) {
        case "subscribe":
        case "unsubscribe":
            send(data);
            break;
        case "togglefeed": 
            
            const previousFeed = (data.product_ids[0] === "PI_XBTUSD") ? ["PI_ETHUSD"] : ["PI_XBTUSD"];
            const unsubscribe = {...data, ...{event: "unsubscribe" as "unsubscribe" , product_ids: previousFeed}}; 
            send(unsubscribe);

            //then change feed
            send({...data, ...{event: "subscribe" as "subscribe"}});
        break;
    }


    const value = {state: data, dispatch};
    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
}

// set the return type
export type subscriptionContextReturnType = {state: SocketPayload, dispatch: Dispatch};

// expose the subscription
const useSubscription = (): subscriptionContextReturnType => {
  const context = useContext(SubscriptionContext) as {state:SocketPayload, dispatch: Dispatch}
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider")
  }
  return context
}

export { useSubscription }

export default SubscriptionProvider;