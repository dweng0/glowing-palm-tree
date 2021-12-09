import React from 'react';
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import Stack from '@mui/material/Stack';
import { content } from '../../../constants/languages'
import {useWebSocket} from '../../../context/WebSocket';
import {wrapperStyle} from './style';
import StatusBarBag from '../presentation/statusbaricon';
import {StatusBarBadgeProps} from '../presentation/interface';
import SocketSwitch from '../presentation/socketswitch';


/**
 * A component that shows the state of the websocket
 */
const StatusBarContainer: React.FunctionComponent = () => {

    const {state, socket} = useWebSocket();

    //extract language todo use a context provider to get the correct language
    const { statusBar } = content.en;
    
    //set defaults
    const stateData: StatusBarBadgeProps = {
        icon: () => <CloudDoneOutlinedIcon />,
        color: "primary",
        label: "...working"
    };

    let currentSocketStatus: "connect" | "disconnect" | "transitioning";

    //for the purpose of killing the socket, it is placed here.
    const changeSocket = () => (currentSocketStatus === "disconnect" && socket && socket.close) ? socket.close() : null;

    /**
    * Set the icon data to be passed to the presentation layer, based on the useWebsocket hook context
    */
    switch(state) { 
        case "OPEN":
            stateData.color = "success";
            stateData.label = statusBar.OPEN;
            stateData.icon = () => <CloudDoneOutlinedIcon/>
            currentSocketStatus = "disconnect";
        break;
        case "CLOSED":
            stateData.color = "warning";
            stateData.label = statusBar.CLOSED;
            stateData.icon  = () => <CloudOffOutlinedIcon/>
            currentSocketStatus = "connect";
        break;
        case "CLOSING":
            stateData.color = "primary";
            stateData.label = statusBar.CLOSING;            
            stateData.icon  = () => <CloudOutlinedIcon/>
            currentSocketStatus = "transitioning";
        break;
        case "CONNECTING":
            stateData.color = "primary";
            stateData.label = statusBar.CONNECTING;
            stateData.icon  = () => <CloudSyncOutlinedIcon/>
            currentSocketStatus = "transitioning";
        break;
        case "ERROR":
            stateData.color = "warning";
            stateData.label = statusBar.ERROR;            
            stateData.icon  = () => <CloudOffOutlinedIcon/>
            currentSocketStatus = "transitioning";
        break;
        default:
            stateData.color = "primary";
            stateData.label = statusBar.CLOSED;
            stateData.icon = () => <CloudOutlinedIcon/>
            currentSocketStatus = "transitioning";
        break;
    }
   
    return (
        <Stack sx={wrapperStyle} direction="row" spacing={1}>
            <StatusBarBag {...stateData} />
            <SocketSwitch buttonState={currentSocketStatus} onClick={changeSocket}/>
        </Stack>
    );
}
export default StatusBarContainer;
