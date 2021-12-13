import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { useSubscription} from "../../context/SocketSubscriber";
import Typography from "@mui/material/Typography";
import Selector from "../CurrencySelector";
import { headStyle } from "./style";

/**
 * Container that handles the switching of feeds 
 */
const LadderWrapper: React.FunctionComponent = () =>  {

    /**
     * *********************************************************
     * Hooks
     * *********************************************************
     */
    
    /**
    * IT: Abstracts away the websocket subscriptions and exposes a dispatcher and a subscription state
    */
    const { state, dispatch } = useSubscription();

    /**
    * IT: stores the ccy for a given feed
    */
    const [currencies, setCurrencies] = useState<Array<string>>(state.product_ids);
    
    /**
     * IT: stores the current feed paused state
     */
    const [pauseFeed, setPauseFeed] = useState<boolean>(false);

    /**
     * IT: Subscribes or unsubscribes to/from a websocket
     * WHEN: pause feed state changes
     */
    useEffect(() => dispatch({type:  (pauseFeed) ? "unsubscribe" : "subscribe"}), [dispatch, pauseFeed]);

    /**
     * IT: switches the subcription to the correct feed
     * WHEN: the currency state changes
     */
    useEffect(() => dispatch({type:"togglefeed", payload:currencies}), [currencies, dispatch]);

    return (
        <div style={{paddingTop:"120px"}}>
            <Card variant="outlined">
                <div style={headStyle}>
                    <Typography variant="h5" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }} >
                        Order Book
                    </Typography>
                    <p>Spread</p>
                    <Selector currentSelection={currencies[0]} onSelect={(event) => setCurrencies([event.target.value])} />
                </div>
                
                <div>
                    {JSON.stringify(state)}
                </div>
            </Card>
        </div>
    )

}

export default LadderWrapper;