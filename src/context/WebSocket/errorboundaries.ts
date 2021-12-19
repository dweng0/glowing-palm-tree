/**
 * Pure functions exposed to process any errors and return an error array.
 * Array is empty if no errors were reached.
 * It may throw if required.
 */
/**
 * Boundary used by websocket context to determine code progression
 * @param socketUrl url provided to the context
 */
 export const websocketContextErrorBoundary = (socketUrl: string): void => { 

    // Error Boundary
    if(!socketUrl.includes("wss://") && !socketUrl.includes("ws://")) {
        throw new Error("Socket url malformed, please contact a site administrator");
    }
 }