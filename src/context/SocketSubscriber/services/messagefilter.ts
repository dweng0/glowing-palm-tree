import { CryptoFeedDelta } from "../../../interface";

/**
 * We need to filter the messages so that the correct data is passed back to the subscription provider. 
 * This method is a HOC that is called before the provided methods are called. piping messages to the correct
 * writer
 * 
 * @param initialWriter the writer to call if the inbound message is the initial dataset
 * @param deltaWriter  the writer to call if the inbound message is a delta dataset
 * @param eventWriter  @optional the writer to call if the message is an event
 */
export const messageFilter = <I, D>(initialWriter: (value: any) => void, deltaWriter: (value: any) => void) => { 
    
    /**
    * @param bufferData the raw data from the feed
    */
    const filter = (bufferData: Array<any>) => { 
       
        if(!bufferData || bufferData.length === 0) {
            return;
        }
        
        //get the first message
        const initialData = bufferData.find(item => item.numLevels !== undefined);
        if(initialData) {
            return initialWriter(initialData as I);
        }
    
        //get the last message in the array, that has bids in it
        const lastUpdatedBidsFeed: D | undefined 
            = bufferData.reduceRight<D | undefined>((acc, item:any) => {
                if(item.bids !== undefined && item.bids.length > 0 && acc === undefined  )  {
                acc = item;
                }
                return acc;
            }, undefined);
    
        // get the last message in the array that has asks in it
        const lastUpdatedAsksFeed: D | undefined
             = bufferData.reduceRight<D | undefined>((acc, item:any) => {
            if(item.asks !== undefined && item.asks.length > 0 && acc === undefined  )  {
               acc = item;
            }
            return acc;
        }, undefined);
            
        // found new bids and asks at different places, merge them
        if(lastUpdatedBidsFeed !== undefined && lastUpdatedAsksFeed !== undefined)  {
            const asksFeed = lastUpdatedAsksFeed as unknown as CryptoFeedDelta;
            deltaWriter({...lastUpdatedBidsFeed, ...{asks: asksFeed.asks}} as D);
        // only found bids
        } else if(lastUpdatedBidsFeed !== undefined) {
            deltaWriter({...lastUpdatedBidsFeed} as D);
        // only found asks
        } else if(lastUpdatedAsksFeed !== undefined) {
            deltaWriter({...lastUpdatedAsksFeed} as D);
        }
    }
    

    return { filter }
}
