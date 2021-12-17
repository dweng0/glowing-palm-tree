import React            from "react";
import InputLabel       from "@mui/material/InputLabel";
import FormControl      from "@mui/material/FormControl";
import Select           from "@mui/material/Select";
import MenuItem         from "@mui/material/MenuItem";
import { SelectorProps} from "./interface";
import {root}           from "./style";
import { content }      from "../../constants/languages";

/**
* Currency Selector component, 
* IT: Displays Available currencies that a users can select
* CHILD OF: {@see LadderWwrapper }
* @param CurrentSelection  The current selection
* @param onSelect          The method to call when a selection is made
*/
const Selector:React.FunctionComponent<SelectorProps> = ({currentSelection, onSelect}) => { 
    const currencies: Array<string> = ["PI_XBTUSD", "PI_ETHUSD"];

    const found = currencies.find(item => item === currentSelection);
    console.log('found', found)
    if(!found) {
        throw new Error("Unknown currency provided")
    }

    const { orderbook } = content.en;
    return (
        <div style={root}>
            <FormControl fullWidth>
                <InputLabel id="label">{orderbook.currency}</InputLabel>
                <Select
                    labelId="label"
                    id="ccyselect"
                    value={currentSelection}
                    label="label"
                    onChange={onSelect}
                    >
                    {currencies.map((item, index) => <MenuItem value={item} key={index}>{item}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
        
    )
}

export default Selector