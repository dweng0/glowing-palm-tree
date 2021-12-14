export interface CryptoFeed { 
    numLevels?: number,
    feed: string,
    product_id: string,
    bids: Array<[number, number]>,
    asks: Array<[number, number]>
}