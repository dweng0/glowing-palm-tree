
/**
 * We need to filter the messages so that the correct data is passed back to the subscription provider. 
 * This method is a HOC that is called before the provided methods are called. piping messages to the correct
 * writer
 * 
 * @param data the raw data from the feed
 * @param initialWriter the writer to call if the inbound message is the initial dataset
 * @param deltaWriter  the writer to call if the inbound message is a delta dataset
 * @param eventWriter  @optional the writer to call if the message is an event
 */
export const messageFilter = <I, D, E = void>(initialWriter: (value: I) => void, deltaWriter: (value: D) => void, eventWriter?: (data: E) => void) => { 
    
    const filter = (data: any) => { 
        if(data.event) { 
            if(eventWriter) {
                eventWriter(data as E);
            }
        } else if(data.numLevels) {
            initialWriter(data as I);
        } else {
            deltaWriter(data as D)
        }        
    }

    return { filter }
}
