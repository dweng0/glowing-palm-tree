import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Feed, LadderProps } from "./interface";
 
const Ladder:React.FunctionComponent<LadderProps> = ({ columns, data}) => {

    return (
        <div style={{ height: "100vh", width:"100%", margin:"12px" }}>
            <DataGrid style={{width:"100%"}} rows={data} columns={columns} />
        </div>
    );
}
export default Ladder;