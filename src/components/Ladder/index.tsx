import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Feed, LadderProps } from "./interface";
 
const Ladder:React.FunctionComponent<LadderProps> = ({ columns, data}) => {

    return (
        <div style={{ height: "100vh", width:"calc(50% - 24px)", margin:"12px", minWidth: "350px", justifyContent: "center" as "center"}}>
            <DataGrid style={{width:"100%"}} rows={data} columns={columns} />
        </div>
    );
}
export default Ladder;