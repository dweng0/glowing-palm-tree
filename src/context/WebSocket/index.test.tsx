import React from "react";
import WebSocketContextProvider from "./index";
import {render} from "@testing-library/react"
import "@testing-library/jest-dom";

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