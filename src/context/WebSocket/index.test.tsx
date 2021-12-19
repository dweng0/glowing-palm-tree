import React from "react";
import WebSocketContextProvider from "./index";
import {render} from "@testing-library/react"
import "@testing-library/jest-dom";
import { websocketContextErrorBoundary } from "./errorboundaries";

describe("Tests for Websocket context", () => { 

    it("should render at runtime", () => { 
      
        expect(<WebSocketContextProvider socketUrl={"wss://thing"} />).toBeDefined();
    });

    it("should set an error state if the provided wss url is malformed", () => {

        //execute
        const executeTest = () => render(<WebSocketContextProvider socketUrl={"://test"} />);
    
        //verify
        expect(executeTest).toThrowError();
    });

});

describe("Error boundaries", () => { 
    
    it("should throw if no websocket url is provided", () => { 
        //setup
        //execute
        const throwable = () => websocketContextErrorBoundary("");

        //verify
        expect(throwable).toThrow();
    })
});