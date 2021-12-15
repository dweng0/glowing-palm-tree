import { BufferInterface } from "../interface";

/**
 * Creates a buffer set for us to write to
 * @param write the method to call when we flush the buffer
 * @param speed the speed at which flushing occurs
 * @throw {Error} if the buffer cannot be parsed.
 */
export const bufferWriter = <T>(write: (data: T) => void, speed: number = 2000 ): BufferInterface => { 

    // step 1. setup an empty set to write into
    const buffer = new Set<string>();

    // step 2. Flush the data captured into the write method provided
    const flush = () => {
        for (const value of buffer)
            write(JSON.parse(value as string) as T);
        buffer.clear()
    };

    // create our interval with speeds and do tidy up
    let timer = setInterval(flush, speed);
    const  resetInterval = () => clearInterval(timer);
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
        
    return { buffer, flush, clear }
}