import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { useSubscription } from "../../context/SocketSubscriber";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Selector from "../CurrencySelector";
import { headStyle, ladderStyle, loadingWrapperStyle } from "./style";
import Ladder from "../Ladder";
import { getFeed, getDelta } from "./services/feedcontroller";
import { FeedType, CryptoFeed, CryptoFeedDelta } from "../../interface";
import { content } from "../../constants/languages";
import { Feed } from "../Ladder/interface";
import { findAllByDisplayValue } from "@testing-library/react";

/**
 * Container that handles the switching of feeds 
 */
const LadderWrapper: React.FunctionComponent = () =>  {

    /**
    * IT: Abstracts away the websocket subscriptions and exposes a dispatcher and a subscription state
    */
    const { state, dataset, delta, dispatch } = useSubscription();
    const [asks, setAsks] = useState<Array<Feed>>([]);
    const [bids, setBids] = useState<Array<Feed>>([]);

    /**
     * Column to be provided to the ladders, reversed where required
     */
    const columns = [
        { field: "price", headerName: "Price", flex: 1 },
        { field: "size", headername: "Size", flex: 1 },
        { field: "total", headername: "Total",  flex: 1 }
    ];
  
    let  contentArea;
    

    useEffect(() => {
        const feed = (type: FeedType, feed: Array<Feed>) => getFeed(type, feed, dataset as CryptoFeed, delta as CryptoFeedDelta);
        setAsks(feed("asks", asks));
        setBids(feed("bids", bids));
        console.log('here');
     }, [dataset, delta, setAsks, setBids]);
    if(state.event === "subscribed" && dataset) {         

        const askColumns = [...columns];        
        contentArea = (
                <div style={ladderStyle}>
                   <Ladder data={bids as Array<Feed>} columns={columns.reverse()} />
                   <Ladder data={asks as Array<Feed>} columns={askColumns} />
                </div>
        )
       
    } else  {
       contentArea = <div style={loadingWrapperStyle}><CircularProgress color="success" /></div>   
    }

    return (
        <div style={{paddingTop:"120px"}}>
            <Card variant="outlined">
                <div style={headStyle}>
                    <Typography variant="h5" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }} >
                        {content.en.title}
                    </Typography>
                    <Typography variant="h5" noWrap component="div" sx={{ mr: 2, display: { xs: "none", md: "flex" } }} >
                        {content.en.orderbook.spread}
                    </Typography>
                    <Selector currentSelection={state.product_ids[0]} onSelect={(event) => dispatch({type:"togglefeed", payload:[event.target.value]})} />
                </div>                
                {contentArea}
            </Card>
        </div>
    )
}

export default LadderWrapper;
