import { ReactNode } from "react";
import { SocketPayload } from "../WebSocket/interface";
import { CryptoFeed, CryptoFeedDelta } from "../../interface";

export interface BufferInterface {
    buffer: Set<string>,
    flush: () => void,
    clear: () => void
}

export interface MessageFilterInterface { 
    filter: (data: any) => void
}

export type Action =  {type: "subscribed"} | {type:"subscribe" } | {type: "unsubscribe" } | {type: "togglefeed", payload: Array<string>}; 

export type Dispatch = (action: Action) => void

export type SubscriptionProviderProps = {children: ReactNode}

export type SubscriptionContextReturnType = {
    state:      SocketPayload,
    dispatch:   Dispatch,
    dataset:    CryptoFeed | undefined,
    delta:      CryptoFeedDelta | undefined    
};