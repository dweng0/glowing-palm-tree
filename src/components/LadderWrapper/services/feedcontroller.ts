import { CryptoFeed, CryptoFeedDelta, FeedType } from "../../../interface";
import { Feed } from "../../Ladder/interface";

/**
 * Returns the delta of a feed
 * @param feedType 
 * @param delta 
 */
export const getDelta = (feedType: FeedType, delta: CryptoFeedDelta | undefined ): Array<Array<number>> => (delta) ? delta[feedType] : [];
    
/**
 * Returns a feed based on data provided to it
 * @param tickSize  The tick size that levels should be grouped by
 * @param feedType  The type of feed (bid or ask)
 * @param dataset   The base data set
 * @param delta     The new delta 
 */
export const getFeed = (tickSize: number, feedType: FeedType, feed:Array<Feed>, dataset: CryptoFeed, delta: CryptoFeedDelta): Array<Feed> => {

    // no dataset? return an empty array
    if(!dataset) {
        return [];
    }

    // No delta? return just the dataset
    if(!delta) {
        return getDataset(feedType, dataset)
            .reduce(transformFeed, []);
    }

    /**
     * return the dataset:
     * - Transformed into a Feed array { @See Feed }
     * - With the deltas applied {@see CryptoFeedDelta },
     * - grouped by tickSize
     * - sorted by size desc
     * - with the total amount accumulated.
     */ 
    return getDataset(feedType, dataset)
        .reduce(transformFeed, [])
        .reduce(applyDelta(delta[feedType], feed), [])
        .sort(bySizeDesc)
        .reduce(groupBy(tickSize, delta[feedType].length), [])
        .map(accumulateTotal);        
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

const bySizeDesc = (compA: Feed, compB: Feed) => compA.size - compB.size;

// HOC returned reducer to group up the Feeds by the requested ticksize
const groupBy = (tickSize: number, feedLength: number) => {
    console.log('using ticksize ', tickSize)
    return (acc: Array<Feed>, curr: Feed, index: number): Array<Feed> => {
        debugger;
        // check it fits into our grouping
        if((curr.size % tickSize) === 0) {
            acc.push(curr);
        } else if(acc.length === 0) { 
            acc.push(curr)
        } else { 
            /**
            * If not add the details of the current level to the previous
            */
            const previous = acc[acc.length - 1];
            debugger;
            previous.size = (previous.size +  curr.size);
            previous.total = curr.total;
        }      

        return acc;
    }
} 

const  applyDelta = (delta: Array<[number, number]>, feed: Array<Feed>) =>(acc: Array<Feed>, curr: Feed, index: number, array: Array<Feed>): Array<Feed>  => {
        
    const rawData = delta.find(item => item[0] === curr.price);
    const previousFeedData = feed.find(item => item.price === curr.price);
    
    // extract price and size (dont spread as may be undefined)
    const price = (rawData) ? rawData[0] : 0;
    const size = (rawData) ?rawData[1] : 0;

    if(price !== 0) { 
        if(size === 0) {
            //no size left on price level, omit from array
            return acc;
        } else {
            acc.push({id: curr.id, price, size, total: curr.total});
        }
    } else if(previousFeedData) {
        acc.push(previousFeedData);
    } else {
        acc.push(curr);
    }
    return acc
}


const getDataset = (feedType: FeedType, dataset: CryptoFeed): Array<Array<number>> => dataset[feedType] || [];
