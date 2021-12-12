export interface SocketState { 
    state: "CLOSED" | "CLOSING" | "CONNECTING" | "OPEN" | "ERROR" | "SUBSCRIBED",
    message: string
}

export type event =  "subscribe" | "subscribed" | "error" | "unsubscribe" | "unsubscribed" | "togglefeed";

export interface SocketPayload { 
    event: event,
    feed: string,
    product_ids: Array<string>
}

export interface WebsocketStatus { 
    socketUrl: string,
}

export interface WebsocketResponse extends SocketState {
    socket: WebSocket | null
}