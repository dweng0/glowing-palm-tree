import React from 'react';
import {SocketSwitchProps} from './interface';

import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import {content} from '../../../constants/languages';

/**
 * Presentational component that renders a button based on the state provided. returns an onclick event that can be used by the parent to perform an action
 * @param props {@see SocketSwitchProps} 
 */
const SocketSwitch: React.FunctionComponent<SocketSwitchProps> = ({buttonState, onClick}) => {
    const { statusBar } = content.en;
   
    return (
        (buttonState === "transitioning") ? 
        <LoadingButton size="small" loading variant="outlined"></LoadingButton> :
        <Button size="small" onClick={onClick}>
            {statusBar.buttonState[buttonState]}
        </Button> 
    )
}
export default SocketSwitch;

