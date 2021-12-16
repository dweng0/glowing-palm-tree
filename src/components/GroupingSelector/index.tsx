import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectorProps } from "./interface";
import {root} from "./style";
import { content } from "../../constants/languages";

const Selector:React.FunctionComponent<SelectorProps> = ({currentSelection, onSelect}) => { 
    const tickSizes: Array<number> = [0.5, 1, 2.5];
    const { orderbook } = content.en;

    return (
        <div style={root}>
            <FormControl fullWidth>
                <InputLabel id="tickLabel">{orderbook.group}</InputLabel>
                <Select
                    labelId="tickLabel"
                    id="tickselector"
                    value={currentSelection}
                    label="label"
                    onChange={onSelect}
                    >
                    {tickSizes.map((item, index) => <MenuItem value={item} key={index}>{item}</MenuItem>)}
                </Select>
            </FormControl>
        </div>        
    )
}

export default Selector