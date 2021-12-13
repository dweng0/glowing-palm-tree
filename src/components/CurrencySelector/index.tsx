import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { CurrencySelectorProps } from './interface';
import {root} from './style';
const Selector:React.FunctionComponent<CurrencySelectorProps> = ({currentSelection, onSelect}) => { 
    const currencies: Array<string> = ["PI_XBTUSD", "PI_ETHUSD"];
    
    return (
        <div style={root}>
            <FormControl fullWidth>
                <InputLabel id="label">Currency</InputLabel>
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