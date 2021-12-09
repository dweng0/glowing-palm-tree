
// The WS to connect to
export const WEBSOCKET_URI = "wss://www.cryptofacilities.com/ws/v1";

// The subscription message
export const subscribe = (currencies: Array<string>) => ({event:"subscribe",feed:"book_ui_1",product_ids:[`${currencies}`]})