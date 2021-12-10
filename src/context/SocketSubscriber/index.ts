import React, { useContext, useReducer, ReactNode} from 'react'
import { SocketPayload } from '../WebSocket/interface'
import { useWebSocket } from '../WebSocket'

// provide type for our subscriber/reducer
type Action = {type: 'subscribe', payload: SocketPayload} | {type: 'unsubscribe', payload: SocketPayload} | {type: 'togglefeed', payload: SocketPayload} 
type Dispatch = (action: Action) => void
type SubscriptionProviderProps = {children: ReactNode}


// Create context privately
const SubscriptionContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined);

// Build subscribe reducer
const subscribeReducer = (state:SocketPayload, action: Action): SocketPayload => { 
    switch (action.type) { 
        case 'subscribe': 
        return {...state, ...action};
        return {eventMessage} //change the state
        case 'unsubscribe':
            return {eventMessage: {}} //change the state in event prop 
        case 'togglefeed':
        return {eventMessage: {...action.payload}}
        default:
            throw new Error(`Type not supported`);
    }
}

/**
 * Provide context for handling subscriptions to the websocket
 * @param 
 */
function SubscriptionProvider({children}: SubscriptionProviderProps) {

    // pull in websockets
    const {socket} = useWebSocket();
    
    // provide the initial state
    const initialState: SocketPayload = { 
        event: "unsubscribed",
        feed: "book_ui_1",
        product_ids: ["PI_XBTUSD"]
    };

    // create the reducer
    const [{eventMessage}, dispatch] = useReducer(subscribeReducer, {eventMessage: initialState});

    /**
     * determine what to do with sockets based on the changed state
     */
    switch(eventMessage.event) {
        case "subscribe":
        case "unsubscribe":
        case "toggleFeed": 
            socket.send(eventMessage);
        break;
    }


    const value = {state: eventMessage, dispatch}
    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
}

function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export {SubscriptionProvider, useCount}