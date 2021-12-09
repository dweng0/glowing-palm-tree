import React from 'react';

import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { content } from '../../contants/languages'
import {useWebSocket} from '../../context/WebSocket';
import {wrapperStyle} from './style';
//statusBar
/**
 * A component that shows the state of the websocket
 */
const StatusBarContainer: React.FunctionComponent = () => {

    const {state} = useWebSocket();

    //extract language todo use a context to get the correct language
    const { statusBar } = content.en;
    
    const stateData = {
        icon: () => <CloudDoneOutlinedIcon />,
        color: "primary",
        label: "...working"
    };

    switch(state) { 
        case "OPEN":
            stateData.color = "success";
            stateData.label = statusBar.OPEN;
            stateData.icon = () => <CloudDoneOutlinedIcon/>
        break;
        case "CLOSED":
            stateData.color = "warning";
            stateData.label = statusBar.CLOSED;
            stateData.icon  = () => <CloudOffOutlinedIcon/>
        break;
        case "CLOSING":
            stateData.color = "primary";
            stateData.label = statusBar.CLOSING;            
            stateData.icon  = () => <CloudOutlinedIcon/>
        break;
        case "CONNECTING":
            stateData.color = "primary";
            stateData.label = statusBar.CONNECTING;
            stateData.icon  = () => <CloudSyncOutlinedIcon/>
        break;
        case "ERROR":
            stateData.color = "warning";
            stateData.label = statusBar.ERROR;            
            stateData.icon  = () => <CloudOffOutlinedIcon/>
        break;
        default:
    }
   
    return (
        <Stack sx={wrapperStyle} direction="row" spacing={1}>
            <Chip icon={stateData.icon()} color={stateData.color} label={stateData.label} variant="outlined" />
        </Stack>
    );
}
export default StatusBar;