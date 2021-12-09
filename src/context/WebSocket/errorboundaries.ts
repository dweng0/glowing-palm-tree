/**
 * Pure functions exposed to process any errors and return an error array.
 * Array is empty if no errors were reached.
 * It may throw if required.
 */

import { SocketPayload } from "./interface";

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

 /**
  * Boundary to determine if the subscription message is good to send
  * @param payload 
  */
 export const websocketPayloadBoundary = (payload: SocketPayload): Array<string> => { 

    const errors = [];
    if(!payload.event) {
        errors.push("Incorrect payload provided to websocket context provider");
    }

    if(!payload.feed) {
        errors.push("No feed was provided to send over websockets");
    }

    if(payload.product_ids.length === 0) {
        errors.push("No Products were provided to send over sockets");
    }
    return errors;
 }