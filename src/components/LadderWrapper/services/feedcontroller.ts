import { CryptoFeed, CryptoFeedDelta, FeedType } from "../../../interface";
import { Feed } from "../../Ladder/interface";

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
export const getFeed = (feedType: FeedType, dataset: CryptoFeed, delta: CryptoFeedDelta): Array<Feed> => {
    if(!dataset) {
        return [];
    }

    if(!delta) {
        return getDataset(feedType, dataset)
            .reduce(transformFeed, []);
    }

    
    const  applyDelta = (acc: Array<Feed>, curr: Feed, index: number, array: Array<Feed>) => {
        const rawData = delta[feedType].find(item => item[0] === curr.price);
        console.log(rawData)
        const price = (rawData) ? rawData[0] : 0;
        const size = (rawData) ?rawData[1] : 0;
        if(price) { 
            if(size === 0) {
                //no size left on price level, omit from array
                return acc;
            } else {
                acc.push({id: curr.id, price, size, total: curr.total});
            }
        } else {
            acc.push(curr);
        }
        return acc
    }

    //otherwise sort by delta
    return getDataset(feedType, dataset)
        .reduce(transformFeed, [])
        .reduce(applyDelta, [])
        .sort(bySize)
        .map(accumulateTotal)
        
}

const transformFeed = (acc: Array<Feed>, curr: Array<number>, index: number): Array<Feed> => { 
    if(curr.length >0) {
        //todo update total with incrementals
        acc.push({id: index, price:curr[0], size:curr[1], total: curr[0]});
    }
    return acc;    
}

const accumulateTotal = (item: Feed, index: number, array: Array<Feed>) => { 
    let current = item;
    const getPreviousSize = () => (array[index - 1]) ? array[index - 1].size : 0;

    current.total = (current.size + getPreviousSize());

    return current;
}

const bySize = (compA: Feed, compB: Feed) => compB.size - compA.size;

const getDataset = (feedType: FeedType, dataset: CryptoFeed): Array<Array<number>> => dataset[feedType] || [];
