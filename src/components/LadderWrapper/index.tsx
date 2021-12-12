import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import { useSubscription} from "../../context/SocketSubscriber";

import Select, { SelectChangeEvent } from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';

const LadderWrapper: React.FunctionComponent = () =>  {
    debugger;
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

    console.log('state is', state);

    return (
        <div style={{paddingTop:"120px", width: "1024px"}}>
            <Card variant="outlined">
            <InputLabel id="label">Currency</InputLabel>
                <Select
                    labelId="label"
                    id="ccyselect"
                    value={12}
                    label="label"
                    onChange={()=>{}}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {JSON.stringify(state)}
            </Card>
        </div>
    )

}

export default LadderWrapper;