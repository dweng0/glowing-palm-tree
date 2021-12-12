import React, { useContext, useReducer, ReactNode} from 'react';
import { SocketPayload, event } from '../WebSocket/interface';
import { useWebSocket } from '../WebSocket';

type Action = {type:'subscribe' } | {type: 'unsubscribe' } | {type: 'togglefeed', payload: ["PI_XBTUSD"|"PI_ETHUSD"]}; 
type Dispatch = (action: Action) => void
type SubscriptionProviderProps = {children: ReactNode}


// Create context privately
const SubscriptionContext = React.createContext<{state: SocketPayload; dispatch: Dispatch} | undefined>(undefined);

// Build subscribe reducer
export const subscribeReducer = (state:SocketPayload, action: Action): SocketPayload => { 
    switch (action.type) { 
        case 'subscribe': 
        case 'unsubscribe':
        return {...state, ...{event: action.type}};
        case 'togglefeed':
            return {...state, ...{product_ids: action.payload}}
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
        event: "unsubscribed",
        feed: "book_ui_1",
        product_ids: ["PI_XBTUSD"]
    };

    // create the reducer
    const [data, dispatch] = useReducer(subscribeReducer, initialState);

    /**
     * determine what to do with sockets based on the changed state
     */
    switch(data.event) {
        case "subscribe":
        case "unsubscribe":
            socket.send(data);
            break;
        case "togglefeed": 
            // unsubscribe first
            const unsubscribe = {...data, ...{event: "unsubscibe"}}; // see if you can just send the event instead of the whole payload
            socket.send(JSON.stringify(unsubscribe));

            //then change feed
            socket.send(JSON.stringify(data));
        break;
    }


    const value = {state: data, dispatch};
    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
}

const useSubscription = (): {state:SocketPayload, dispatch: Dispatch} => {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export {SubscriptionProvider, useSubscription}