import React, { useState } from 'react';
import { SocketPayload } from "../../interface";
import {useWebSocket} from "../../context/WebSocket";

//todo take out into style
const style = {
    minHeight: "100vh",
    paddingTop: "120px"
};

const AVAILABLE_CCY = ["PI_XBTUSD", "PI_ETHUSD"];

const LadderWrapper: React.FunctionComponent = () =>  {
    const {state, socket} = useWebSocket();
    const {subscribedFeed, setSubscribedFeed} = useState<SocketPayload>(null)
    const [toggleFeed, setToggleFeed] = useState<string>(null);
    const [pauseFeed, setPauseFeed] = useState<string>(false);

    // Error boundary
    if(socket && socket.send && socket.onmessage) { 
//use a reducer here?
        /**
         * ***************************************************************
         * Websocket send logic
         * ***************************************************************
         */
        const payload: SocketPayload = { 
            event: "subscribe",
            feed: "book_ui_1",
            product_ids: [AVAILABLE_CCY[0]]
        };
        
        if(!subscribedFeed) { 
            //check we are subscribed
            socket.send(JSON.stringify(payload));
        } else if (toggleFeed && toggleFeed !== subscribedFeed.product_ids[0]) { 
            //togglefeed state changed
            payload.product_ids = [toggleFeed]
            socket.send(JSON.parse(payload));
        } else if(pauseFeed === true && subscribedFeed.event === "subscribed") { 
            //pause feed
            payload.event = "unsubscribe";
            socket.send(JSON.parse(payload));
        }  else if (pauseFeed === false && subscribedFeed.event === "")

            //{"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]}
        // handle messages
        socket.onmessage = ({data}) => { 
            try {

                //check if the data is a subscription event
                const response = JSON.parse(data);
                if(response.event && response.event === "subscribed") {
                    setSubscribedFeed(response);
                }

            } catch { 
                socket.close();
                //context will pick this up and update the ui
            }
            
        }
        

    } else {
        //todo show loading
    }
            
        // socket.onmessage = ({data}) => { 
        //     if(data.)
        // }

        // const payload = {
        //     event: "subscribe",
        //     feed: "book_ui_1",
        //     product_ids: [ccy]
        // }

        // if(socket && socket.send) {
        //     socket.send(JSON.stringify(payload));
        // }
        // }
        
        // return (
        //     <div>sausage</div>
        // )
}

export default LadderWrapper;