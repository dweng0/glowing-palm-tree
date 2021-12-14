import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Feed, LadderProps } from "./interface";
 
const Ladder:React.FunctionComponent<LadderProps> = ({ columns, data}) => {

    const processData = (acc: Array<Feed>, curr: Array<number>, index: number): Array<Feed> => { 
        // if we havebids at that price... render it
        if(curr.length >0) {
            //todo update total with incrementals
            acc.push({id: index, price:curr[0], size:curr[1], total: curr[0]});
        }
        return acc;    
    }

    const feed = data.reduce(processData, []);
    
    return (
        <div style={{ height: "100vh", width:"100%", margin:"12px" }}>
        <DataGrid style={{width:"100%"}} rows={feed} columns={columns} />
        </div>
    );
}
export default Ladder;