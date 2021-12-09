export interface SocketState { 
    state: 'CLOSED' | 'CLOSING' | 'CONNECTING' | 'OPEN' | 'ERROR',
    message: string
}

export interface SocketPayload { 
    event: string,
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