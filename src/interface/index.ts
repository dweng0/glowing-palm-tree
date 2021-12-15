export type FeedType = "bids" | "asks";

export interface CryptoFeed extends CryptoFeedDelta { 
    numLevels: number
}

export interface CryptoFeedDelta { 
    feed: string,
    product_id: string,
    bids: Array<[number, number]>,
    asks: Array<[number, number]>
}