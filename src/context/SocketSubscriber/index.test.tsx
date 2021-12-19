import React from 'react';

import {render} from "@testing-library/react";
import SubscriptionProvider, { useSubscription } from "./index";
import WebsocketProvider from "../WebSocket";
import {WEBSOCKET_URI} from "../../constants/datalayer";

describe("Socket subscription context", () => { 

    it("should throw if it is not used under a websocket provider", () => {
         //setup
     
         //execute
         const testRender = () => render(
            <SubscriptionProvider>
              <p>hi</p>
            </SubscriptionProvider>
         );
 
         //verify
         expect(testRender).toThrow();
    });
});
