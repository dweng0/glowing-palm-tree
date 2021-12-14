import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { useSubscription} from "../../context/SocketSubscriber";
import Typography from "@mui/material/Typography";
import Selector from "../CurrencySelector";
import { headStyle, ladderStyle } from "./style";
import Ladder from "../Ladder";
import { CryptoFeed } from "../../interface";

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
    const { state, feed, dispatch } = useSubscription();

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
    
    /**
     * Column to be provided to the ladders, reversed where required
     */
    const columns = [
        { id: 1, field: "Price", flex: 1 },
        { id: 1, field: "Size", flex: 1 },
        { id: 1, field: "Total", flex: 1 }
    ];

    // lazy load feed
    const getFeed = (feedType: "bids"|"asks" ): Array<Array<number>> => (feed) ? feed[feedType] : [];
      
    return (
        <div style={{paddingTop:"120px"}}>
            <Card variant="outlined">
                <div style={headStyle}>
                    <Typography variant="h5" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }} >
                        Order Book //todo languages
                    </Typography>
                    <Typography variant="h5" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }} >
                        Spread //todo languages
                    </Typography>
                    <Selector currentSelection={currencies[0]} onSelect={(event) => setCurrencies([event.target.value])} />
                </div>                
                <div style={ladderStyle}>
                   <Ladder data={getFeed("bids")} columns={columns} />
                   <Ladder data={getFeed("asks")} columns={columns.reverse()} />
                </div>
            </Card>
        </div>
    )
}

export default LadderWrapper;

/**
 *   columns: GridColDef[] ,
    data:Array<[number, number]>
 */