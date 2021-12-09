export interface CryptoFeed { 
    feed: string,
    product_id: string,
    bids: Array<[number, number]>
    asks: []
}