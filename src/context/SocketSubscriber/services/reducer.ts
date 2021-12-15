import { SocketPayload } from "../../WebSocket/interface";
import { Action } from "../interface";

// Build setup reducer
export const subscribeReducer = (state:SocketPayload, action: Action): SocketPayload => { 
    switch (action.type) { 
        case "subscribe": 
        case "unsubscribe":
        case "subscribed":
        return {...state, ...{event: action.type}};
        case "togglefeed":
            return {...state, ...{product_ids: action.payload, event: "togglefeed"}}
        default:
            throw new Error(`Type not supported`);
    }
}