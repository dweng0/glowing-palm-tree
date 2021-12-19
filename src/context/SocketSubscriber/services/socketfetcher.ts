
/**
 * Will return the socket when it is available.
 * @param socket 
 * @returns promise<Websocket>
 */
export const getSocket = (socket: WebSocket | null, maxAttempts:number = 10): Promise<WebSocket> => { 
    return new Promise<WebSocket>((resolve, reject) => { 
    
        const maxTries = maxAttempts;
        let attempts = 0;
        let timeout: any;

        const retrieveLiveSocket = () => { 
            if(attempts > maxTries) {
                clearTimeout(timeout);
                return reject(`Failed to get websocket. Timeout Reached after ${attempts} attempts`)
            }
            if(socket) {
                clearTimeout(timeout);
                return resolve(socket);
            }
            attempts++;
        }
        timeout = setInterval(retrieveLiveSocket, 1500);
    })
}