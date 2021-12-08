import React from 'react';
import WebSocketContextProvider from './websocketcontext';
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import { SocketPayload } from './interface';


describe('Tests for Websocket context', () => { 

    it('should render at runtime', () => { 
        const testPayload: SocketPayload = {
            event: "test",
            feed: "best",
            product_ids: ["jest"]
        };

        expect(<WebSocketContextProvider socketUrl={"wss://thing"} payload={testPayload} />).toBeDefined();
    });

    it('should set an error state if the provided wss url is malformed', () => {

        //setup
        const testPayload: SocketPayload = {
            event: "Test",
            feed: "test",
            product_ids: ["sdf"]
        };
   
        //execute
        const executeTest = () => render(<WebSocketContextProvider socketUrl={"://test"} payload={testPayload} />);
    
        //verify
        expect(executeTest).toThrowError();
    });
});