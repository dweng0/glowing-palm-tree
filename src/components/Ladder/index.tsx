import React            from 'react';
import { DataGrid }     from '@mui/x-data-grid';
import { LadderProps }  from "./interface";
 
/**
 * Ladder Component
 * IT: Renders a datagrid
 * CHILD OF: {@see LadderWwrapper }
 * @param columns  The columns to render
 * @param data     The data to fill the datagrid up with
 */
const Ladder:React.FunctionComponent<LadderProps> = ({ columns, data}) => {

    return (
        <div style={{ height: "100vh", width:"calc(50% - 24px)", margin:"12px", minWidth: "350px", justifyContent: "center" as "center"}}>
            <DataGrid rowHeight={35} style={{width:"100%"}} rows={data} columns={columns} hideFooterPagination={true} hideFooter={true} />
        </div>
    );
}
export default Ladder;