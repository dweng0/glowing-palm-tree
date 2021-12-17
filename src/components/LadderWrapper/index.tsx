import React, { useState, useEffect }                   from "react";
import { headStyle, ladderStyle, loadingWrapperStyle }  from "./style";
import { CryptoFeed, CryptoFeedDelta }                  from "../../interface";

import Card                 from "@mui/material/Card";
import { useSubscription }  from "../../context/SocketSubscriber";
import Typography           from "@mui/material/Typography";
import CircularProgress     from '@mui/material/CircularProgress';
import CurrencySelector     from "../CurrencySelector";
import TickSelector         from "../GroupingSelector";
import Ladder               from "../Ladder";
import { feedBuilder }      from "./services/feedcontroller";
import { content }          from "../../constants/languages";
import { Feed }             from "../Ladder/interface";
import { getColumns }       from "./services/columns";

/**
 *  IT: handles data processing and feeds presentational components with required data
 */
const LadderWrapper: React.FunctionComponent = () =>  {

    /**
    * IT: Abstracts away the websocket subscriptions and exposes a dispatcher, feed data and socket state
    */
    const { state, dataset, delta, dispatch } = useSubscription();
    
    /**
     * Hold presentational state
     */
    const [asks, setAsks]           = useState<Array<Feed>>([]);
    const [bids, setBids]           = useState<Array<Feed>>([]);
    const [spread, setSpread]       = useState<number>();
    const [tickSize, setTickSize]   = useState<number>(0.5);

    /**
     * Sets up a feed builder based on the state provided
     */
    const { getFeed } = feedBuilder(tickSize, bids, asks, dataset as CryptoFeed, delta as CryptoFeedDelta); 

    /**
     * IT:      builds a Feed that the datagrid can consume from the Websocket data (Crypto feed) 
     * WHEN:    The Delta changes
     */
    useEffect(() => {
        setAsks(getFeed("asks"));
        setBids(getFeed("bids"));
     }, [getFeed, setAsks, setBids]);

     /**
      * IT:     Updates spread data
      * WHEN:   Bids/Asks feed change
      */
     useEffect(() => { 
        if(bids.length > 0 && asks.length > 0) {
            setSpread(Math.abs(bids[0].price - asks[0].price));
        } else { 
            setSpread(0);
        }
     }, [bids, asks, setSpread]);

     // Handle rendering spread details
     const getSpreadAsPercentageofBook = () => { 
         let content = null;
         if(spread && bids.length && asks.length) {
            const percent = (spread / (bids[0].price + asks[0].price) * 100);
            content = <Typography variant="subtitle1"> {`(${percent.toFixed(2)}%)`}</Typography>
         }
         return content;
     }

    let  contentArea;    

    /**
     * IT:          Renders the ladders 
     * WHEN:        The socket state is set to "subscribed"
     * OTHERWISE:   it shows a loading spinner
     */
    if(state.event === "subscribed" && dataset) {         
 
        contentArea = (
                <div style={ladderStyle}>
                   <Ladder priceColour={"green"} data={bids as Array<Feed>} columns={getColumns("bids")} />
                   <Ladder priceColour={"red"} data={asks as Array<Feed>} columns={getColumns("asks")} />
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
                        {content.en.orderbook.spread} {spread} {getSpreadAsPercentageofBook()}
                    </Typography>
                    <div style={{display:"flex"}}>
                        <CurrencySelector currentSelection={state.product_ids[0]} onSelect={(event) => dispatch({type:"togglefeed", payload:[event.target.value]})} />
                        <TickSelector currentSelection={tickSize} onSelect={({target}) => setTickSize(target.value)} />
                    </div>
                </div>                
                {contentArea}
            </Card>
        </div>
    )
}

export default LadderWrapper;
