
// The WS to connect to
export const WEBSOCKET_URI = "wss://www.cryptofacilities.com/ws/v1";

// number of mseconds to wait before retrying the socket
export const RETRY_DEBOUNCE = 2500 

// number of mseconds to wait before flushing the buffer
export const UPDATE_SPEED = 1300;


// The subscription message
export const subscribe = (currencies: Array<string>) => ({event:"subscribe",feed:"book_ui_1",product_ids:[`${currencies}`]})
