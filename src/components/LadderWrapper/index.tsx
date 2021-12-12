import React, { useState, useEffect } from 'react';
import { useSubscription} from "../../context/SocketSubscriber";


const LadderWrapper: React.FunctionComponent = () =>  {

    /**
     * *********************************************************
     * Hooks
     * *********************************************************
     */
    
    /**
    * IT: Abstracts away the websocket subscriptions and exposes a dispatcher and a subscription state
    */
    const {state, dispatch} = useSubscription();

    /**
    * IT: stores the ccy for a given feed
    */
    const [currencies, setCurrencies] = useState<["PI_XBTUSD" | "PI_ETHUSD"]>(state.product_ids);
    
    const [pauseFeed, setPauseFeed] = useState<boolean>(true);

    /**
     * IT: Subscribes or unsubscribes to/from a websocket
     * WHEN: pause feed state changes
     */
    useEffect(() => dispatch({type:  (pauseFeed) ? "unsubscribe" : "subscribe"}), [dispatch, pauseFeed]);

    /**
     * IT: switches the subcription to the correct feed
     * WHEN: the currency state changes
     */
    useEffect(() => dispatch({type:"togglefeed", payload:{product_ids: currencies}}), [currencies, dispatch]);

    return (
        <div>
            Test
        </div>
    )

}

export default LadderWrapper;