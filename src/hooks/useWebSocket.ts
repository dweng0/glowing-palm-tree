import { useContext } from 'react';

/**
 * A hook to expose websockets at any layer of component depth
 */
export function useWebSocket() { 
    const websocketContext = useContext;

    if(websocketContext === undefined) { 
        throw new Error("Please use in conjunction with a context provider")
    }

    return websocketContext;
}