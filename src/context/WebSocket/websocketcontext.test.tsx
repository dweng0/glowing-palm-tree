import React from 'react';
import WebSocketContextProvider from './websocketcontext';
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import { SocketPayload } from './interface';


describe('Tests for Websocket context', () => { 

    it('should render at runtime', () => { 
      
        expect(<WebSocketContextProvider socketUrl={"wss://thing"} />).toBeDefined();
    });

    it('should set an error state if the provided wss url is malformed', () => {

        //execute
        const executeTest = () => render(<WebSocketContextProvider socketUrl={"://test"} />);
    
        //verify
        expect(executeTest).toThrowError();
    });
});