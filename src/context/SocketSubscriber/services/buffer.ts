import { BufferInterface } from "../interface";

/**
 * Creates a buffer set for us to write to
 * @param write the method to call when we flush the buffer
 * @param speed the speed at which flushing occurs
 * @throw {Error} if the buffer cannot be parsed.
 */
export const bufferWriter = <T>(filteredFlush: (buffer: Array<T>) => void, speed: number = 2000, ): BufferInterface => { 

    // step 1. setup an empty array to write into
    let buffer = new Array<T>()

    // step 2. Flush the data captured into the write method provided. Clear the buffer for the next feed
    const flush = () => {
        filteredFlush(buffer);
        buffer = [];
    };

    // create our interval with speeds and do tidy up
    const timer = setInterval(flush, speed);
    const resetInterval = () => clearInterval(timer);
    window.addEventListener("unload", resetInterval);

    // expose a way to shutdown the interval
    const clear = () => { 
        // clean up first
        window.removeEventListener("unload", resetInterval);

        // and dump any data we currently have
        flush();

        // then shutdown the interval
        resetInterval();
    }

    const add = (message: string) => { 
        if(message) {
            try {
                buffer.push(JSON.parse(message as string) as T);
            } catch {
                throw new Error("Failed to parse the last message, was it a string?");
            }
        } else {
            throw new Error("socket message was empty!");
        }
    }
        
    return { add, flush, clear }
}