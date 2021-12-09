import React                    from "react";
import Chip                     from "@mui/material/Chip";
import { StatusBarBadgeProps }    from "./interface";

/**
 * Presentational component for the status bar.
 */
const StatusBarIcon: React.FunctionComponent<StatusBarBadgeProps> = ({ icon, color, label}) => <Chip icon={icon()} color={color} label={label} variant="outlined" />
export default StatusBarIcon;
    