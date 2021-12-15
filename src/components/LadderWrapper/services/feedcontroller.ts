import { CryptoFeed, CryptoFeedDelta, FeedType } from "../../../interface";

/**
 * Returns the delta of a feed
 * @param feedType 
 * @param delta 
 */
export const getDelta = (feedType: FeedType, delta: CryptoFeedDelta | undefined ): Array<Array<number>> => (delta) ? delta[feedType] : [];
    
/**
 * returns the initial dataset
 * @param feedType 
 * @param dataset 
 * @param delta 
 */
export const getFeed = (feedType: FeedType, dataset: CryptoFeed): Array<Array<number>> => {
    if(!dataset) {
        return [];
    }

    return getDataset(feedType, dataset);
}

const getDataset = (feedType: FeedType, dataset: CryptoFeed): Array<Array<number>> => dataset[feedType] || [];
