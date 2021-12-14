import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { useSubscription} from "../../context/SocketSubscriber";
import Typography from "@mui/material/Typography";
import Selector from "../CurrencySelector";
import { headStyle, ladderStyle } from "./style";
import Ladder from "../Ladder";

/**
 * Container that handles the switching of feeds 
 */
const LadderWrapper: React.FunctionComponent = () =>  {

    /**
    * IT: Abstracts away the websocket subscriptions and exposes a dispatcher and a subscription state
    */
    const { state, feed, dispatch } = useSubscription();

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
    let  contentArea;

    if(state.event !== "subscribed") { 
        contentArea = <p>Loading</p>
    } else {
        console.log(getFeed("bids"));
        console.log(getFeed("asks"));
        contentArea = (
                <div style={ladderStyle}>
                   <Ladder data={getFeed("bids")} columns={columns} />
                   <Ladder data={getFeed("asks")} columns={columns.reverse()} />
                </div>
        )
    }
    console.log(state);

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
                    <Selector currentSelection={state.product_ids[0]} onSelect={(event) => dispatch({type:"togglefeed", payload:[event.target.value]})} />
                </div>                
                {contentArea}
            </Card>
        </div>
    )
}

export default LadderWrapper;
