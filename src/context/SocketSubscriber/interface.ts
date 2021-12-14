import { ReactNode } from "react";
import { SocketPayload } from "../WebSocket/interface";
import { CryptoFeed } from "../../interface";

export interface BufferInterface {
    buffer: Set<string>,
    flush: () => void,
    clear: () => void
}

export type Action =  {type: "subscribed"} | {type:"subscribe" } | {type: "unsubscribe" } | {type: "togglefeed", payload: Array<string>}; 
export type Dispatch = (action: Action) => void
export type SubscriptionProviderProps = {children: ReactNode}
export type SubscriptionContextReturnType = {
    state: SocketPayload,
    dispatch: Dispatch,
    feed: CryptoFeed | undefined
    subscribed: boolean
};