import React, { useState } from 'react';
import { SocketPayload } from "../../interface";
import { useSubscription} from "../../context/SocketSubscriber";
//todo take out into style
const style = {
    minHeight: "100vh",
    paddingTop: "120px"
};

const AVAILABLE_CCY = ["PI_XBTUSD", "PI_ETHUSD"];

const LadderWrapper: React.FunctionComponent = () =>  {
    const {state, dispatch} = useSubscription();
    
    
    if(state.di)

}

export default LadderWrapper;