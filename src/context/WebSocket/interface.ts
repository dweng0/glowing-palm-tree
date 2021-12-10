export interface SocketState { 
    state: "CLOSED" | "CLOSING" | "CONNECTING" | "OPEN" | "ERROR" | "SUBSCRIBED",
    message: string
}

export interface SocketPayload { 
    event:  "subscribe" | "subscribed" | "error" | "unsubscribe" | "unsubscribed";
    feed: string,
    product_ids: Array<string>
}

export interface WebsocketStatus { 
    socketUrl: string,
}

export interface WebsocketResponse extends SocketState {
    data: any,
    socket: WebSocket | null
}