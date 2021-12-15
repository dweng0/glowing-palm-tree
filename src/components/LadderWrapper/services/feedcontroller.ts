import { CryptoFeed, CryptoFeedDelta, FeedType } from "../../../interface";

const getDataset = (feedType: FeedType, dataset: CryptoFeed): Array<Array<number>> => dataset[feedType] || [];
const getDelta = (feedType: FeedType, delta: CryptoFeedDelta ): Array<Array<number>> => delta[feedType] || [];
    
/**
 * return bids or asks 
 * @param feedType 
 * @param dataset 
 * @param delta 
 */
export const getFeed = (feedType: FeedType, dataset: CryptoFeed, delta: CryptoFeedDelta): Array<Array<number>> => {
    if(!dataset) {
        return [];
    }

    if(!delta) { 
        return getDataset(feedType, dataset);
    }

    return getDelta(feedType, delta);
}