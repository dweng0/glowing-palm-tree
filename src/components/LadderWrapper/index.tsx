import React from "react";
import Card from "@mui/material/Card";
import { useSubscription} from "../../context/SocketSubscriber";
import Typography from "@mui/material/Typography";
import Selector from "../CurrencySelector";
import { headStyle, ladderStyle } from "./style";
import Ladder from "../Ladder";
import { getFeed } from "./services/feedcontroller";
import { FeedType, CryptoFeed, CryptoFeedDelta } from "../../interface";
import { content } from "../../constants/languages";

/**
 * Container that handles the switching of feeds 
 */
const LadderWrapper: React.FunctionComponent = () =>  {

    /**
    * IT: Abstracts away the websocket subscriptions and exposes a dispatcher and a subscription state
    */
    const { state, dataset, delta, dispatch } = useSubscription();

    /**
     * Column to be provided to the ladders, reversed where required
     */
    const columns = [
        { id: 1, field: "Price", flex: 1 },
        { id: 1, field: "Size", flex: 1 },
        { id: 1, field: "Total", flex: 1 }
    ];
  
    let  contentArea;

    const feed = (type: FeedType) => getFeed(type, dataset as CryptoFeed, delta as CryptoFeedDelta);
    if(state.event === "subscribed" && dataset) {         
        contentArea = (
                <div style={ladderStyle}>
                   <Ladder data={feed("bids")} columns={columns} />
                   <Ladder data={feed("asks")} columns={columns.reverse()} />
                </div>
        )
       
    } else  {
        contentArea = <p>{content.en.loading}</p>
    }
    console.log(state);

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
