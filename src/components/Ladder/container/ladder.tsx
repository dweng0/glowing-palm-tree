import React from "react";
import { AgGridReact } from "ag-grid-react";
import Columns from "../presentation/columns"

const columns = [{field: "Total"}, {field: "Size"}, {field: "Price"}];

const LadderComponent: React.FunctionComponent = () => { 
    
    return (
        <AgGridReact>
            <Columns items={columns}/>
        </AgGridReact>
    )
}

export default LadderComponent;