import React                    from 'react';
import Chip                     from '@mui/material/Chip';
import { StatusBarBagProps }    from './interface';

/**
 * Presentational component for the status bar.
 */
const StatusBarIcon: React.FunctionComponent<StatusBarBagProps> = ({ icon, color, label}) => <Chip icon={icon()} color={color} label={label} variant="outlined" />
export default StatusBarIcon;
    