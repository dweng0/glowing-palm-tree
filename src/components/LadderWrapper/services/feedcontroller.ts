import { CryptoFeed, CryptoFeedDelta, FeedType } from "../../../interface";
import { Feed } from "../../Ladder/interface";

/**
 * Returns a feed based on data provided to it
 * @param tickSize  The tick size that levels should be grouped by
 * @param feedType  The type of feed (bid or ask)
 * @param dataset   The base data set
 * @param delta     The new delta 
 */
export const buildFeed = (tickSize: number, feedType: FeedType, feed:Array<Feed>, dataset: CryptoFeed, delta: CryptoFeedDelta): Array<Feed> => {

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
     * - Transformed into a Feed array { @See Feed } for the datagrid to consume
     * - Apply deltas {@see CryptoFeedDelta },
     * - Group by tickSize
     * - sorted by size desc
     * - with the total amount accumulated.
     */ 
    return getDataset(feedType, dataset)
        .reduce(transformFeed, [])
        .reduce(applyDelta(delta[feedType], feed), [])
        .sort(byPrice)
        .reduce(groupBy(tickSize, delta[feedType].length), [])
        .map(sumTotals);        
}

const transformFeed = (acc: Array<Feed>, curr: Array<number>, index: number): Array<Feed> => { 
    if(curr.length >0) {    
        acc.push({id: curr[0], price:curr[0], size:curr[1], total: curr[1]});
    }
    return acc;    
}

const sumTotals = (item: Feed, index: number, array: Array<Feed>) => { 
    let current = item;
    const getPreviousSize = () => (array[index - 1]) ? array[index - 1].size : 0;

    current.total = (current.size + getPreviousSize());

    return current;
}

/**
 * Floating points cause rounding errors when working at high persision, this method adds percision
 * {@see https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript }
 * @param val 
 * @param step 
 */
const floatSafeModulus = (val: number, step: number) => {
    // take the decimal counts
    const valDecCount = (val.toString().split('.')[1] || '').length;
    const stepDecCount = (step.toString().split('.')[1] || '').length;

    // determine the decimal count to use when parsing into an int
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;

    // parse the values back 
    const valInt = parseInt(val.toFixed(decCount).replace('.', ''));
    const stepInt = parseInt(step.toFixed(decCount).replace('.', ''));

    // MOD / decimal count ^ 10
    return (valInt % stepInt) / Math.pow(10, decCount);
  }

const byPrice = (compA: Feed, compB: Feed) => compB.price - compA.price;

/**
 * Steps:
 * - modulo check to see if price falls into a ticksize grouping. push to accumulator
 *      - Price is lowered into next available group if it does not match grouping already
 * - see if price point already exists in accumulator, update it if it does else
 *      - push onto array if it does not.
 * 
 * - return accumulator for next iteration
 * @param tickSize 
 * @param feedLength 
 */
const groupBy = (tickSize: number, feedLength: number) => {
    return (acc: Array<Feed>, curr: Feed, index: number): Array<Feed> => {
     
        const rightSideofDecimal    = curr.price.toString().split(".")[1];
        const reducedTickSize       = (rightSideofDecimal && rightSideofDecimal.length === 2 && tickSize === 0.5);
        const tick                  = (reducedTickSize && tickSize === 0.5) ? 0.05 : tickSize;
        const modulo                = (val: number, step: number) => tick === 0.05 ? floatSafeModulus(val, step) : (val % step);

        /**
        * Find the next lowest group price level
        */
        while(curr.price > 0.05 && modulo(curr.price, tick) !== 0) {
            curr.price = parseFloat((curr.price - 0.05).toFixed(2));
        }

        /**
        * Does this price already exist in the array?
        */
        let matchingData: {priceLevel: Feed | undefined, index: number | undefined} = {
            priceLevel: undefined,
            index: undefined
        };
        acc.forEach((previous, index) => {
            if(previous.price === curr.price) {
                previous.size = (previous.size +  curr.size);
                previous.total = curr.total;
                matchingData.priceLevel = previous;
                matchingData.index = index;
            }
        });

        /**
         * If so, splice new values into accumulator, otherwise push the new price point into the accumulator
         */
        if(matchingData.priceLevel !== undefined && matchingData.index !== undefined) { 
            acc.splice(matchingData.index, 1, matchingData.priceLevel);
        } else {
            acc.push(curr);
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
            // push the new price and size into the existing  data
            acc.push({id: curr.id, price, size, total: curr.total});
        }
    } else if(previousFeedData) {
        //if the delta has no price, and we have an existing price point in our feed. use that instead
        acc.push(previousFeedData);
    } else {
        // otherwise theres no delta data, so we can safely put this price point back into the array.
        acc.push(curr);
    }
    return acc
}


const getDataset = (feedType: FeedType, dataset: CryptoFeed): Array<Array<number>> => dataset[feedType] || [];
