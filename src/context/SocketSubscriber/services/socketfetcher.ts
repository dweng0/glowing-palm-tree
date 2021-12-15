
/**
 * Will return the socket when it is available.
 * @param socket 
 */
export const getSocket = (socket: WebSocket | null): Promise<WebSocket> => { 
    return new Promise<WebSocket>((resolve, reject) => { 
    
        const maxTries = 10;
        let attempts = 0;
        let timeout: any;

        const retrieveLiveSocket = () => { 
            if(attempts > maxTries) {
                clearTimeout(timeout);
                return reject()
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